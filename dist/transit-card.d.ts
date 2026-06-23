import { LitElement, PropertyValues } from 'lit';
import type { HomeAssistant, TransitCardConfig } from './types';
import './components/departure-row';
import './components/section-header';
import './components/status-bar';
import './components/transit-map';
export declare class TransitCard extends LitElement {
    static styles: import("lit").CSSResult[];
    hass?: HomeAssistant;
    private _config?;
    private _rawDepartures;
    private _status;
    private _lastUpdated;
    private _error;
    private _now;
    private _collapsedSections;
    private _stationLocations;
    private _lastSig;
    private _clockInterval?;
    setConfig(config: TransitCardConfig): void;
    getCardSize(): number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    private _startClock;
    private _stopClock;
    private _sourceEntityIds;
    private _recomputeIfNeeded;
    private _recompute;
    private _buildStations;
    private _isStale;
    private _handleToggleSection;
    private _renderLoadingSkeleton;
    private _renderError;
    private _renderEmpty;
    private _renderSections;
    private _renderListLayout;
    private _renderMapLayout;
    render(): import("lit-html").TemplateResult<1>;
    static getConfigElement(): HTMLElement | undefined;
    static getStubConfig(): TransitCardConfig;
}
declare global {
    interface HTMLElementTagNameMap {
        'transit-card': TransitCard;
    }
}
//# sourceMappingURL=transit-card.d.ts.map