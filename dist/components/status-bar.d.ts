import { LitElement } from 'lit';
export type ConnectionStatus = 'live' | 'loading' | 'error' | 'offline';
export declare class StatusBar extends LitElement {
    static styles: import("lit").CSSResult;
    status: ConnectionStatus;
    lastUpdated: Date | null;
    private _getStatusText;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'status-bar': StatusBar;
    }
}
//# sourceMappingURL=status-bar.d.ts.map