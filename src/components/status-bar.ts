import { LitElement, html } from 'lit';
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

  private _getStatusText(): string {
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
    return html`
      <div class="status-bar">
        <div class="status-indicator">
          <span class="status-dot ${this.status}"></span>
          <span>${this._getStatusText()}</span>
        </div>
        <div>
          ${this.lastUpdated
            ? html`Aktualisiert ${formatTime(this.lastUpdated)}`
            : html`v6.db.transport.rest`}
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
