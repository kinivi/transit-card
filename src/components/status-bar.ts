import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatTime } from '../utils/time';
import { cardStyles } from '../styles/card-styles';

export type ConnectionStatus = 'live' | 'loading' | 'error' | 'offline';

@customElement('status-bar')
export class StatusBar extends LitElement {
  static styles = cardStyles;

  @property()
  status: ConnectionStatus = 'loading';

  @property({ attribute: false })
  lastUpdated: Date | null = null;

  @property({ type: Boolean })
  stale = false;

  private _getStatusText(): string {
    if (this.stale && this.status === 'live') return 'Veraltet';
    switch (this.status) {
      case 'live':
        return 'Live';
      case 'loading':
        return 'Aktualisiere...';
      case 'error':
        return 'Fehler';
      case 'offline':
        return 'Offline';
    }
  }

  render() {
    // A stale-but-live source shows the error-style dot to flag the lag.
    const dotClass = this.stale && this.status === 'live' ? 'error' : this.status;

    return html`
      <div class="status-bar">
        <div class="status-indicator">
          <span class="status-dot ${dotClass}"></span>
          <span>${this._getStatusText()}</span>
        </div>
        <div>
          ${this.lastUpdated
            ? html`Aktualisiert ${formatTime(this.lastUpdated)}`
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'status-bar': StatusBar;
  }
}
