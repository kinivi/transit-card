import { LitElement } from 'lit';
import type { TransitType, Departure } from '../types';
export declare class TransitSection extends LitElement {
    static styles: import("lit").CSSResult[];
    type: TransitType;
    collapsed: boolean;
    departures: Departure[];
    now: Date;
    maxItems: number;
    private _toggleCollapsed;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'transit-section': TransitSection;
    }
}
//# sourceMappingURL=section-header.d.ts.map