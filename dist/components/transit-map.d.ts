import { LitElement, PropertyValues } from 'lit';
import type { StopLocation, GroupedDepartures } from '../types';
export declare class TransitMap extends LitElement {
    static styles: import("lit").CSSResult;
    stations: StopLocation[];
    departures: GroupedDepartures;
    now: Date;
    zoom?: number;
    center?: {
        lat: number;
        lng: number;
    };
    private _leafletReady;
    private _mapInitialized;
    private _map;
    private _markers;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    private _loadLeaflet;
    protected updated(changedProperties: PropertyValues): void;
    private _initMap;
    private _destroyMap;
    private _allDepartures;
    private _departuresForStation;
    private _updateMarkers;
    private _createMarkerIcon;
    private _createPopupContent;
    private _updatePopups;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'transit-map': TransitMap;
    }
}
//# sourceMappingURL=transit-map.d.ts.map