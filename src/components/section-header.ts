import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TransitType, Departure } from '../types';
import { cardStyles } from '../styles/card-styles';

const SECTION_LABELS: Record<TransitType, string> = {
  sbahn: 'S-Bahn',
  tram: 'Straßenbahn',
  bus: 'Bus',
};

@customElement('transit-section')
export class TransitSection extends LitElement {
  static styles = [
    cardStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  @property()
  type!: TransitType;

  @property({ type: Boolean })
  collapsed = false;

  @property({ attribute: false })
  departures: Departure[] = [];

  @property({ attribute: false })
  now: Date = new Date();

  @property({ type: Number })
  maxItems = 5;

  private _toggleCollapsed() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent('toggle-section', {
        detail: { type: this.type, collapsed: this.collapsed },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const visibleDepartures = this.departures.slice(0, this.maxItems);
    const hasContent = this.departures.length > 0;

    if (!hasContent) {
      return html``;
    }

    return html`
      <div class="section">
        <div
          class="section-header"
          @click=${this._toggleCollapsed}
          role="button"
          tabindex="0"
          aria-expanded=${!this.collapsed}
          @keydown=${(e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this._toggleCollapsed();
            }
          }}
        >
          <div class="section-title">
            <span class="section-icon ${this.type}"></span>
            ${SECTION_LABELS[this.type]}
          </div>
          <span class="section-toggle ${this.collapsed ? 'collapsed' : ''}">▼</span>
        </div>

        <div
          class="section-content ${this.collapsed ? 'collapsed' : ''}"
          style="max-height: ${this.collapsed ? 0 : visibleDepartures.length * 50}px"
        >
          ${visibleDepartures.map(
            (dep) => html`
              <departure-row .departure=${dep} .now=${this.now}></departure-row>
            `
          )}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'transit-section': TransitSection;
  }
}
