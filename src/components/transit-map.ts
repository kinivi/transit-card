import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { StopLocation, Departure, GroupedDepartures, TransitType } from '../types';
import { formatMinutesUntil, minutesUntil } from '../utils/time';

// Carto Dark Matter tiles URL
const TILE_URL = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const TILE_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>';

// Leaflet CDN URLs
const LEAFLET_CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

// Declare Leaflet as a global (loaded from CDN)
declare const L: typeof import('leaflet');

// Track if Leaflet is loaded globally
let leafletLoaded = false;
let leafletLoadPromise: Promise<void> | null = null;

async function loadLeaflet(): Promise<void> {
  if (leafletLoaded && typeof L !== 'undefined') return;

  if (leafletLoadPromise) return leafletLoadPromise;

  leafletLoadPromise = new Promise<void>((resolve, reject) => {
    // Check if already loaded
    if (typeof L !== 'undefined') {
      leafletLoaded = true;
      resolve();
      return;
    }

    // Load CSS
    if (!document.querySelector(`link[href="${LEAFLET_CSS_URL}"]`)) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = LEAFLET_CSS_URL;
      document.head.appendChild(cssLink);
    }

    // Load JS
    const script = document.createElement('script');
    script.src = LEAFLET_JS_URL;
    script.onload = () => {
      leafletLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load Leaflet'));
    document.head.appendChild(script);
  });

  return leafletLoadPromise;
}

@customElement('transit-map')
export class TransitMap extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 350px;
    }

    .map-container {
      width: 100%;
      height: 100%;
      min-height: 350px;
      border-radius: var(--radius-md, 10px);
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
    }

    .loading-map {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-height: 350px;
      color: rgba(255, 255, 255, 0.6);
      font-size: 14px;
    }
  `;

  @property({ attribute: false })
  stations: StopLocation[] = [];

  @property({ attribute: false })
  departures: GroupedDepartures = { sbahn: [], tram: [], bus: [] };

  @property({ attribute: false })
  now: Date = new Date();

  @property({ type: Number })
  zoom?: number;

  @property({ attribute: false })
  center?: { lat: number; lng: number };

  @state()
  private _leafletReady = false;

  @state()
  private _mapInitialized = false;

  private _map: L.Map | null = null;
  private _markers: L.Marker[] = [];

  async connectedCallback() {
    super.connectedCallback();
    await this._loadLeaflet();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._destroyMap();
  }

  private async _loadLeaflet() {
    try {
      await loadLeaflet();
      this._leafletReady = true;
    } catch (error) {
      console.error('[transit-card] Failed to load Leaflet:', error);
    }
  }

  protected updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (this._leafletReady && !this._mapInitialized) {
      // Wait for next frame to ensure container is rendered
      requestAnimationFrame(() => this._initMap());
    }

    if (changedProperties.has('stations') || changedProperties.has('departures')) {
      this._updateMarkers();
    }

    if (changedProperties.has('now')) {
      this._updatePopups();
    }
  }

  private _initMap() {
    if (this._mapInitialized || !this._leafletReady) return;

    const container = this.shadowRoot?.querySelector('.map-container') as HTMLDivElement;
    if (!container) return;

    // Default center (Heidelberg) if no stations
    const defaultCenter: [number, number] = [49.4034, 8.6845];
    const defaultZoom = 14;

    try {
      this._map = L.map(container, {
        center: this.center ? [this.center.lat, this.center.lng] : defaultCenter,
        zoom: this.zoom || defaultZoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer(TILE_URL, {
        attribution: TILE_ATTRIBUTION,
        maxZoom: 18,
      }).addTo(this._map);

      this._mapInitialized = true;

      // Add markers if stations already loaded
      if (this.stations.length > 0) {
        this._updateMarkers();
      }
    } catch (error) {
      console.error('[transit-card] Failed to initialize map:', error);
    }
  }

  private _destroyMap() {
    if (this._map) {
      this._map.remove();
      this._map = null;
      this._markers = [];
      this._mapInitialized = false;
    }
  }

  private _allDepartures(): Departure[] {
    return [...this.departures.sbahn, ...this.departures.tram, ...this.departures.bus];
  }

  // Match departures to a station by payload `stopName`; the synthetic '__all__'
  // station (used when only map.center is configured) aggregates everything.
  private _departuresForStation(station: StopLocation): Departure[] {
    const all = this._allDepartures();
    if (station.id === '__all__') return all;
    return all.filter((d) => d.stopName && (d.stopName === station.name || d.stopName === station.id));
  }

  private _updateMarkers() {
    if (!this._map || !this._mapInitialized) return;

    // Clear existing markers
    this._markers.forEach((m) => m.remove());
    this._markers = [];

    if (this.stations.length === 0) return;

    // Create markers for each station
    const bounds = L.latLngBounds([]);

    this.stations.forEach((station) => {
      const types = new Set<TransitType>(this._departuresForStation(station).map((d) => d.type));
      if (types.size === 0) types.add('sbahn');
      const primaryType = types.has('sbahn') ? 'sbahn' : types.has('tram') ? 'tram' : 'bus';

      // Create custom icon
      const icon = this._createMarkerIcon(primaryType, types.size > 1);

      const marker = L.marker([station.latitude, station.longitude], { icon })
        .addTo(this._map!);

      // Bind popup
      marker.bindPopup(() => this._createPopupContent(station), {
        className: 'transit-popup',
        maxWidth: 280,
      });

      this._markers.push(marker);
      bounds.extend([station.latitude, station.longitude]);
    });

    // Fit map to show all markers (with padding)
    if (this.stations.length > 0 && !this.center) {
      this._map.fitBounds(bounds, { padding: [30, 30] });
    }
  }

  private _createMarkerIcon(type: TransitType, mixed: boolean): L.DivIcon {
    const colors: Record<TransitType, string> = {
      sbahn: '#4caf50',
      tram: '#42a5f5',
      bus: '#ab47bc',
    };

    const bgColor = mixed
      ? `linear-gradient(135deg, #4caf50 33%, #42a5f5 33%, #42a5f5 66%, #ab47bc 66%)`
      : colors[type];

    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid white;
          background: ${bgColor};
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }

  private _createPopupContent(station: StopLocation): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = 'font-family: inherit; min-width: 180px;';

    // Get departures for this station
    const stationDepartures: Departure[] = this._departuresForStation(station)
      .slice()
      .sort(
        (a, b) =>
          (a.actualTime ?? a.plannedTime).getTime() - (b.actualTime ?? b.plannedTime).getTime()
      )
      .slice(0, 5);

    const colors: Record<TransitType, string> = {
      sbahn: '#4caf50',
      tram: '#42a5f5',
      bus: '#ab47bc',
    };

    container.innerHTML = `
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #333;">${station.name}</div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        ${stationDepartures.length === 0
          ? '<div style="color: #666; font-size: 12px;">Keine Abfahrten</div>'
          : stationDepartures
              .map((dep) => {
                const mins = minutesUntil(dep.actualTime || dep.plannedTime, this.now);
                const arrow = dep.directionArrow
                  ? `<span style="font-weight: bold; color: ${dep.directionArrow === 'left' ? '#42a5f5' : '#ab47bc'};">${dep.directionArrow === 'left' ? '←' : '→'}</span>`
                  : '';
                return `
                <div style="display: flex; align-items: center; gap: 6px; font-size: 12px;">
                  <span style="min-width: 28px; padding: 2px 4px; border-radius: 3px; background: ${colors[dep.type]}; color: white; font-weight: bold; text-align: center; font-size: 11px;">${dep.line}</span>
                  ${arrow}
                  <span style="flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: #333;">${dep.direction}</span>
                  <span style="font-weight: 600; color: #333; white-space: nowrap;">${formatMinutesUntil(mins)}</span>
                </div>
              `;
              })
              .join('')
        }
      </div>
    `;

    return container;
  }

  private _updatePopups() {
    // Update popup contents if any are open
    this._markers.forEach((marker) => {
      if (marker.isPopupOpen()) {
        const popup = marker.getPopup();
        if (popup) {
          const station = this.stations.find(
            (s) =>
              s.latitude === marker.getLatLng().lat &&
              s.longitude === marker.getLatLng().lng
          );
          if (station) {
            popup.setContent(this._createPopupContent(station));
          }
        }
      }
    });
  }

  render() {
    if (!this._leafletReady) {
      return html`<div class="loading-map">Karte wird geladen...</div>`;
    }
    return html`<div class="map-container"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'transit-map': TransitMap;
  }
}
