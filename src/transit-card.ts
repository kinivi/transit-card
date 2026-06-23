import { LitElement, html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  HomeAssistant,
  TransitCardConfig,
  GroupedDepartures,
  TransitType,
  StopLocation,
} from './types';
import { TRANSIT_TYPES, resolveEntityId } from './types';
import { parseDeparturesFromState, filterAndSortDepartures } from './api/db-transport';
import { cardStyles } from './styles/card-styles';
import { mapStyles } from './styles/map-styles';
import type { ConnectionStatus } from './components/status-bar';

// Import components
import './components/departure-row';
import './components/section-header';
import './components/status-bar';
import './components/transit-map';

const DEFAULT_MAX_DEPARTURES = 5;
const DEFAULT_STALE_THRESHOLD = 180; // seconds (≈ three missed 1-min polls)

@customElement('transit-card')
export class TransitCard extends LitElement {
  static styles = [cardStyles, mapStyles];

  @property({ attribute: false })
  hass?: HomeAssistant;

  @state()
  private _config?: TransitCardConfig;

  // Parsed but UNFILTERED departures; freshness filters are applied at render time.
  @state()
  private _rawDepartures: GroupedDepartures = { sbahn: [], tram: [], bus: [] };

  @state()
  private _status: ConnectionStatus = 'loading';

  @state()
  private _lastUpdated: Date | null = null;

  @state()
  private _error: string | null = null;

  @state()
  private _now: Date = new Date();

  @state()
  private _collapsedSections: Set<TransitType> = new Set();

  @state()
  private _stationLocations: StopLocation[] = [];

  // Signature of the configured source entities (id + last_updated + state). Recompute
  // only fires when this changes, so unrelated HA state updates don't re-parse.
  private _lastSig = '';
  private _clockInterval?: number;

  setConfig(config: TransitCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }

    // Helpful guard: catch the old numeric DB stop-id config and point at the new format.
    const stops = config.stops || {};
    for (const type of TRANSIT_TYPES) {
      const value = (stops as Record<string, unknown>)[type];
      if (value == null) continue;
      if (Array.isArray(value)) {
        throw new Error(
          `transit-card: "stops.${type}" is a list of stop IDs (old format). ` +
            `Use a single Home Assistant entity, e.g.  stops.${type}: sensor.transit_${type}_all`
        );
      }
      const id = resolveEntityId(value as string | { entity: string });
      if (id && /^\d+$/.test(id)) {
        throw new Error(
          `transit-card: "stops.${type}: ${id}" looks like a Deutsche Bahn stop ID (old format). ` +
            `Point it at a Home Assistant entity instead, e.g.  stops.${type}: sensor.transit_${type}_all`
        );
      }
    }

    this._config = config;
    this._collapsedSections = config.collapsed ? new Set(config.collapsed) : new Set();
  }

  getCardSize(): number {
    const sections = TRANSIT_TYPES.filter((t) => this._rawDepartures[t].length > 0).length;
    return Math.max(3, sections * 3);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._startClock();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopClock();
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has('hass') || changed.has('_config')) {
      this._recomputeIfNeeded();
    }
  }

  private _startClock(): void {
    // Local 1 s tick for live countdowns. Not a network call.
    this._clockInterval = window.setInterval(() => {
      this._now = new Date();
    }, 1000);
  }

  private _stopClock(): void {
    if (this._clockInterval) {
      clearInterval(this._clockInterval);
      this._clockInterval = undefined;
    }
  }

  private _sourceEntityIds(): string[] {
    const ids: string[] = [];
    for (const type of TRANSIT_TYPES) {
      const id = resolveEntityId(this._config?.stops?.[type]);
      if (id) ids.push(id);
    }
    return ids;
  }

  private _recomputeIfNeeded(): void {
    if (!this.hass || !this._config) return;
    const ids = this._sourceEntityIds();
    const sig = ids
      .map((id) => {
        const e = this.hass!.states[id];
        return e ? `${id}@${e.last_updated}#${e.state}` : `${id}@none`;
      })
      .join('|');
    if (sig === this._lastSig) return;
    this._lastSig = sig;
    this._recompute();
  }

  private _recompute(): void {
    const raw: GroupedDepartures = { sbahn: [], tram: [], bus: [] };
    let configured = 0;
    let available = 0;
    let firstError = '';
    let newest = 0;

    for (const type of TRANSIT_TYPES) {
      const id = resolveEntityId(this._config!.stops?.[type]);
      if (!id) continue;
      configured++;
      const ent = this.hass!.states[id];
      if (!ent || ent.state === 'unavailable' || ent.state === 'unknown') {
        if (!firstError) firstError = `Entität „${id}“ nicht verfügbar`;
        continue;
      }
      available++;
      raw[type] = parseDeparturesFromState(ent, type);
      const lu = Date.parse(ent.last_updated);
      if (!isNaN(lu) && lu > newest) newest = lu;
    }

    this._rawDepartures = raw;
    this._lastUpdated = newest ? new Date(newest) : null;
    this._stationLocations = this._buildStations(raw);

    if (configured === 0) {
      this._status = 'error';
      this._error = 'Keine Entitäten konfiguriert (stops.sbahn / tram / bus)';
    } else if (available === 0) {
      this._status = 'error';
      this._error = firstError || 'Quelle nicht verfügbar';
    } else {
      this._status = 'live';
      this._error = null;
    }
  }

  // Map stations: prefer coordinates carried in the payload; fall back to per-station
  // coords in config; finally a single aggregate marker at map.center. No API lookups.
  private _buildStations(raw: GroupedDepartures): StopLocation[] {
    const out: StopLocation[] = [];
    const seen = new Set<string>();

    for (const type of TRANSIT_TYPES) {
      for (const dep of raw[type]) {
        if (typeof dep.lat === 'number' && typeof dep.lng === 'number') {
          const key = dep.stopName || `${dep.lat},${dep.lng}`;
          if (!seen.has(key)) {
            seen.add(key);
            out.push({ id: key, name: dep.stopName || key, latitude: dep.lat, longitude: dep.lng });
          }
        }
      }
    }

    const cfgStops = this._config?.map?.stops;
    if (cfgStops) {
      for (const [name, c] of Object.entries(cfgStops)) {
        if (c && typeof c.lat === 'number' && typeof c.lng === 'number' && !seen.has(name)) {
          seen.add(name);
          out.push({ id: name, name, latitude: c.lat, longitude: c.lng });
        }
      }
    }

    const center = this._config?.map?.center;
    if (out.length === 0 && center) {
      out.push({ id: '__all__', name: this._config?.title || '', latitude: center.lat, longitude: center.lng });
    }

    return out;
  }

  private _isStale(now: Date): boolean {
    if (!this._lastUpdated) return false;
    const threshold = (this._config?.stale_threshold ?? DEFAULT_STALE_THRESHOLD) * 1000;
    return now.getTime() - this._lastUpdated.getTime() > threshold;
  }

  private _handleToggleSection(e: CustomEvent<{ type: TransitType; collapsed: boolean }>): void {
    const { type, collapsed } = e.detail;
    if (collapsed) {
      this._collapsedSections.add(type);
    } else {
      this._collapsedSections.delete(type);
    }
    this.requestUpdate();
  }

  private _renderLoadingSkeleton(): unknown {
    return html`
      <div class="loading-skeleton"></div>
      <div class="loading-skeleton"></div>
      <div class="loading-skeleton"></div>
    `;
  }

  private _renderError(): unknown {
    return html`<div class="error-state">${this._error || 'Keine Daten'}</div>`;
  }

  private _renderEmpty(): unknown {
    return html`<div class="empty-state">Keine Abfahrten gefunden</div>`;
  }

  private _renderSections(grouped: GroupedDepartures) {
    const maxDeps = this._config?.max_departures || DEFAULT_MAX_DEPARTURES;
    return TRANSIT_TYPES.map(
      (type) => html`
        <transit-section
          type=${type}
          .departures=${grouped[type]}
          .collapsed=${this._collapsedSections.has(type)}
          .now=${this._now}
          .maxItems=${maxDeps}
        ></transit-section>
      `
    );
  }

  private _renderListLayout(grouped: GroupedDepartures) {
    return html`${this._renderSections(grouped)}`;
  }

  private _renderMapLayout(grouped: GroupedDepartures) {
    return html`
      <div class="map-layout">
        <div class="map-column">
          <transit-map
            .stations=${this._stationLocations}
            .departures=${grouped}
            .now=${this._now}
            .zoom=${this._config?.map?.zoom}
            .center=${this._config?.map?.center}
          ></transit-map>
          <div class="map-overlay"></div>
        </div>

        <div class="departures-column" @toggle-section=${this._handleToggleSection}>
          ${this._renderSections(grouped)}
        </div>
      </div>
    `;
  }

  render() {
    const now = this._now;
    const grouped: GroupedDepartures = {
      sbahn: filterAndSortDepartures(this._rawDepartures.sbahn, now),
      tram: filterAndSortDepartures(this._rawDepartures.tram, now),
      bus: filterAndSortDepartures(this._rawDepartures.bus, now),
    };

    const hasContent =
      grouped.sbahn.length > 0 || grouped.tram.length > 0 || grouped.bus.length > 0;

    const isLoading = this._status === 'loading' && !hasContent;
    const isError = this._status === 'error' && !hasContent;
    const isMapLayout = this._config?.layout === 'map';

    return html`
      <ha-card>
        ${this._config?.title
          ? html`<div class="card-header">${this._config.title}</div>`
          : nothing}

        <div class="card-content" @toggle-section=${this._handleToggleSection}>
          ${isLoading
            ? this._renderLoadingSkeleton()
            : isError
              ? this._renderError()
              : !hasContent
                ? this._renderEmpty()
                : isMapLayout
                  ? this._renderMapLayout(grouped)
                  : this._renderListLayout(grouped)}
        </div>

        <status-bar
          .status=${this._status}
          .lastUpdated=${this._lastUpdated}
          .stale=${this._isStale(now)}
        ></status-bar>
      </ha-card>
    `;
  }

  // Card picker configuration
  static getConfigElement(): HTMLElement | undefined {
    return undefined;
  }

  static getStubConfig(): TransitCardConfig {
    return {
      type: 'custom:transit-card',
      title: 'Abfahrten',
      stops: {
        sbahn: 'sensor.transit_s_bahn_all',
        bus: 'sensor.transit_bus_all',
        tram: 'sensor.transit_tram_all',
      },
      max_departures: 5,
    };
  }
}

// Register card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'transit-card',
  name: 'Transit Card',
  description: 'Real-time transit departures rendered from Home Assistant entities',
  preview: true,
  documentationURL: 'https://github.com/kinivi/transit-card',
});

declare global {
  interface HTMLElementTagNameMap {
    'transit-card': TransitCard;
  }
}
