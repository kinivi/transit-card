import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { HomeAssistant, TransitCardConfig, GroupedDepartures, TransitType } from './types';
import { fetchAllDepartures } from './api/db-transport';
import { cardStyles } from './styles/card-styles';
import type { ConnectionStatus } from './components/status-bar';

// Import components
import './components/departure-row';
import './components/section-header';
import './components/status-bar';

const DEFAULT_REFRESH_INTERVAL = 30;
const DEFAULT_MAX_DEPARTURES = 5;

@customElement('transit-card')
export class TransitCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false })
  hass?: HomeAssistant;

  @state()
  private _config?: TransitCardConfig;

  @state()
  private _departures: GroupedDepartures = { sbahn: [], tram: [], bus: [] };

  @state()
  private _status: ConnectionStatus = 'loading';

  @state()
  private _lastUpdated: Date | null = null;

  @state()
  private _now: Date = new Date();

  @state()
  private _collapsedSections: Set<TransitType> = new Set();

  @state()
  private _error: string | null = null;

  private _refreshInterval?: number;
  private _clockInterval?: number;

  setConfig(config: TransitCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = config;

    // Initialize collapsed sections from config
    if (config.collapsed) {
      this._collapsedSections = new Set(config.collapsed);
    }
  }

  getCardSize(): number {
    // Estimate based on content
    const sections = [
      this._departures.sbahn.length,
      this._departures.tram.length,
      this._departures.bus.length,
    ].filter((len) => len > 0).length;

    return Math.max(3, sections * 3);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._startPolling();
    this._startClock();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._stopPolling();
    this._stopClock();
  }

  private _startPolling(): void {
    // Initial fetch
    this._fetchData();

    // Set up polling
    const interval = (this._config?.refresh_interval || DEFAULT_REFRESH_INTERVAL) * 1000;
    this._refreshInterval = window.setInterval(() => {
      this._fetchData();
    }, interval);
  }

  private _stopPolling(): void {
    if (this._refreshInterval) {
      clearInterval(this._refreshInterval);
      this._refreshInterval = undefined;
    }
  }

  private _startClock(): void {
    // Update "now" every second for live countdowns
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

  private async _fetchData(): Promise<void> {
    this._status = 'loading';
    this._error = null;

    try {
      const departures = await fetchAllDepartures({
        ...this._config?.stops,
        proxy_url: this._config?.proxy_url,
      });
      this._departures = departures;
      this._lastUpdated = new Date();
      this._status = 'live';
    } catch (err) {
      console.error('Failed to fetch departures:', err);
      this._status = 'error';
      this._error = err instanceof Error ? err.message : 'Verbindungsfehler';
    }
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
    return html`
      <div class="error-state">
        ${this._error || 'Verbindungsfehler'}
        <br />
        <button @click=${this._fetchData} style="margin-top: 8px; cursor: pointer;">
          Erneut versuchen
        </button>
      </div>
    `;
  }

  private _renderEmpty(): unknown {
    return html`
      <div class="empty-state">Keine Abfahrten gefunden</div>
    `;
  }

  render() {
    const maxDeps = this._config?.max_departures || DEFAULT_MAX_DEPARTURES;
    const hasContent =
      this._departures.sbahn.length > 0 ||
      this._departures.tram.length > 0 ||
      this._departures.bus.length > 0;

    const isLoading = this._status === 'loading' && !hasContent;
    const isError = this._status === 'error' && !hasContent;

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
                : html`
                    <transit-section
                      type="sbahn"
                      .departures=${this._departures.sbahn}
                      .collapsed=${this._collapsedSections.has('sbahn')}
                      .now=${this._now}
                      .maxItems=${maxDeps}
                    ></transit-section>

                    <transit-section
                      type="tram"
                      .departures=${this._departures.tram}
                      .collapsed=${this._collapsedSections.has('tram')}
                      .now=${this._now}
                      .maxItems=${maxDeps}
                    ></transit-section>

                    <transit-section
                      type="bus"
                      .departures=${this._departures.bus}
                      .collapsed=${this._collapsedSections.has('bus')}
                      .now=${this._now}
                      .maxItems=${maxDeps}
                    ></transit-section>
                  `}
        </div>

        <status-bar .status=${this._status} .lastUpdated=${this._lastUpdated}></status-bar>
      </ha-card>
    `;
  }

  // Card picker configuration
  static getConfigElement(): HTMLElement | undefined {
    // TODO: Implement visual config editor
    return undefined;
  }

  static getStubConfig(): TransitCardConfig {
    return {
      type: 'custom:transit-card',
      title: 'Abfahrten',
      stops: {
        sbahn: '8002681',
        tram: ['506913', '506953'],
        bus: ['518175'],
      },
      refresh_interval: 30,
      max_departures: 5,
    };
  }
}

// Register card with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'transit-card',
  name: 'Transit Card',
  description: 'Real-time transit departures with glass-blur aesthetic',
  preview: true,
  documentationURL: 'https://github.com/kinivi/transit-card',
});

declare global {
  interface HTMLElementTagNameMap {
    'transit-card': TransitCard;
  }
}
