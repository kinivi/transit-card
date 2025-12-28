import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Departure } from '../types';
import { formatTime, minutesUntil, formatMinutesUntil, formatDelay, formatPlatform } from '../utils/time';
import { cardStyles } from '../styles/card-styles';

@customElement('departure-row')
export class DepartureRow extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false })
  departure!: Departure;

  @property({ attribute: false })
  now: Date = new Date();

  render() {
    const dep = this.departure;
    const departureTime = dep.actualTime || dep.plannedTime;
    const minutes = minutesUntil(departureTime, this.now);
    const isSoon = minutes <= 5 && minutes >= 0;

    return html`
      <div class="departure-row ${dep.cancelled ? 'cancelled' : ''}">
        <div class="line-badge ${dep.type}">${dep.line}</div>

        <div class="direction">${dep.direction}</div>

        <div class="time-info">
          ${dep.delay > 0
            ? html`<span class="delay ${dep.delay > 5 ? 'major' : ''}">${formatDelay(dep.delay)}</span>`
            : nothing}
          ${dep.platform
            ? html`<span class="platform">${formatPlatform(dep.platform)}</span>`
            : nothing}
          <span class="time">${formatTime(dep.plannedTime)}</span>
          <span class="minutes ${isSoon ? 'soon' : ''}">${dep.cancelled ? 'Ausfall' : formatMinutesUntil(minutes)}</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'departure-row': DepartureRow;
  }
}
