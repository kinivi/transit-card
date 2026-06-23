import { css } from 'lit';

export const mapStyles = css`
  /* 2-column map layout */
  .map-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    min-height: 400px;
  }

  /* Map column */
  .map-column {
    position: relative;
    border-radius: var(--radius-md);
    overflow: hidden;
    min-height: 350px;
    background: rgba(0, 0, 0, 0.3);
  }

  .map-container {
    width: 100%;
    height: 100%;
    min-height: 350px;
  }

  /* Glass overlay on map */
  .map-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-md);
  }

  /* Departures column in map layout */
  .departures-column {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    max-height: 400px;
    overflow-y: auto;
  }

  /* Direction arrows */
  .direction-arrow {
    font-weight: bold;
    font-size: 14px;
    flex-shrink: 0;
  }

  .direction-arrow.left {
    color: var(--tram-color);
  }

  .direction-arrow.right {
    color: var(--bus-color);
  }

  /* Station markers */
  .station-marker {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    color: white;
  }

  .station-marker.sbahn {
    background: var(--sbahn-color);
  }

  .station-marker.tram {
    background: var(--tram-color);
  }

  .station-marker.bus {
    background: var(--bus-color);
  }

  .station-marker.mixed {
    background: linear-gradient(
      135deg,
      var(--sbahn-color) 33%,
      var(--tram-color) 33%,
      var(--tram-color) 66%,
      var(--bus-color) 66%
    );
  }

  /* Marker popup styling */
  .marker-popup {
    font-family: inherit;
    min-width: 200px;
    padding: var(--spacing-sm);
  }

  .marker-popup h4 {
    margin: 0 0 var(--spacing-sm);
    color: #333;
    font-size: 14px;
    font-weight: 600;
  }

  .popup-departures {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .popup-row {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 12px;
    color: #333;
  }

  .popup-row .line {
    min-width: 32px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: bold;
    text-align: center;
    color: white;
  }

  .popup-row .line.sbahn {
    background: var(--sbahn-color);
  }

  .popup-row .line.tram {
    background: var(--tram-color);
  }

  .popup-row .line.bus {
    background: var(--bus-color);
  }

  .popup-row .dir {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .popup-row .time {
    font-weight: 600;
    white-space: nowrap;
  }

  /* Dark map tiles enhancement */
  .leaflet-tile-pane {
    filter: brightness(0.85) saturate(0.9);
  }

  /* Leaflet control styling for glass theme */
  .leaflet-control-zoom {
    border: 1px solid var(--glass-border) !important;
    background: var(--glass-bg) !important;
    backdrop-filter: blur(10px);
  }

  .leaflet-control-zoom a {
    background: transparent !important;
    color: var(--text-primary) !important;
    border-bottom: 1px solid var(--glass-border) !important;
  }

  .leaflet-control-zoom a:last-child {
    border-bottom: none !important;
  }

  .leaflet-control-zoom a:hover {
    background: var(--glass-bg-hover) !important;
  }

  /* Responsive: stack on mobile */
  @media (max-width: 600px) {
    .map-layout {
      grid-template-columns: 1fr;
    }

    .map-column {
      min-height: 250px;
    }

    .departures-column {
      max-height: 300px;
    }
  }
`;

// Leaflet CSS that needs to be injected into shadow DOM
export const leafletCssUrl = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
