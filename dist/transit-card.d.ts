import { LitElement } from 'lit';
import type { HomeAssistant, TransitCardConfig } from './types';
import './components/departure-row';
import './components/section-header';
import './components/status-bar';
export declare class TransitCard extends LitElement {
    static styles: import("lit").CSSResult;
    hass?: HomeAssistant;
    private _config?;
    private _departures;
    private _status;
    private _lastUpdated;
    private _now;
    private _collapsedSections;
    private _error;
    private _refreshInterval?;
    private _clockInterval?;
    setConfig(config: TransitCardConfig): void;
    getCardSize(): number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _startPolling;
    private _stopPolling;
    private _startClock;
    private _stopClock;
    private _fetchData;
    private _handleToggleSection;
    private _renderLoadingSkeleton;
    private _renderError;
    private _renderEmpty;
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