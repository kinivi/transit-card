import { LitElement, html, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('direction-arrow')
export class DirectionArrow extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .direction-arrow {
      font-weight: bold;
      font-size: 14px;
    }

    .direction-arrow.left {
      color: var(--tram-color, #42a5f5);
    }

    .direction-arrow.right {
      color: var(--bus-color, #ab47bc);
    }
  `;

  @property({ type: String })
  direction: 'left' | 'right' | null = null;

  render() {
    if (!this.direction) return nothing;

    return html`
      <span class="direction-arrow ${this.direction}">
        ${this.direction === 'left' ? '←' : '→'}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'direction-arrow': DirectionArrow;
  }
}
