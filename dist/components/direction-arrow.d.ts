import { LitElement, nothing } from 'lit';
export declare class DirectionArrow extends LitElement {
    static styles: import("lit").CSSResult;
    direction: 'left' | 'right' | null;
    render(): import("lit-html").TemplateResult<1> | typeof nothing;
}
declare global {
    interface HTMLElementTagNameMap {
        'direction-arrow': DirectionArrow;
    }
}
//# sourceMappingURL=direction-arrow.d.ts.map