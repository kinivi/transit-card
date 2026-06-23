import { LitElement, html, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Departure } from '../types';
import { formatTime, minutesUntil, formatMinutesUntil, formatDelay, formatPlatform } from '../utils/time';
import { cardStyles } from '../styles/card-styles';

@customElement('departure-row')
export class DepartureRow extends LitElement {
  static styles = [
    cardStyles,
    css`
      .direction-wrapper {
        display: flex;
        align-items: center;
        gap: var(--spacing-xs, 4px);
        overflow: hidden;
      }

      .direction-arrow {
        font-weight: bold;
        font-size: 14px;
        flex-shrink: 0;
      }

      .direction-arrow.left {
        color: var(--tram-color, #42a5f5);
      }

      .direction-arrow.right {
        color: var(--bus-color, #ab47bc);
      }
    `,
  ];

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

        <div class="direction-wrapper">
          ${dep.directionArrow
            ? html`<span class="direction-arrow ${dep.directionArrow}">${dep.directionArrow === 'left' ? '←' : '→'}</span>`
            : nothing}
          <div class="direction">${dep.direction}</div>
        </div>

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
