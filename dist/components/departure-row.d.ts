import { LitElement } from 'lit';
import type { Departure } from '../types';
export declare class DepartureRow extends LitElement {
    static styles: import("lit").CSSResult;
    departure: Departure;
    now: Date;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'departure-row': DepartureRow;
    }
}
//# sourceMappingURL=departure-row.d.ts.map