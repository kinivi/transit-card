import { css } from 'lit';

export const cardStyles = css`
  :host {
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-bg-hover: rgba(255, 255, 255, 0.12);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-blur: 20px;

    --text-primary: rgba(255, 255, 255, 0.95);
    --text-secondary: rgba(255, 255, 255, 0.6);
    --text-muted: rgba(255, 255, 255, 0.4);

    --sbahn-color: #4caf50;
    --tram-color: #42a5f5;
    --bus-color: #ab47bc;

    --delay-minor: #ffa726;
    --delay-major: #ef5350;

    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 12px;
    --spacing-lg: 16px;
    --spacing-xl: 24px;

    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;

    --font-mono: 'SF Mono', 'JetBrains Mono', 'Fira Code', monospace;

    display: block;
  }

  ha-card {
    background: var(--glass-bg);
    backdrop-filter: blur(var(--glass-blur));
    -webkit-backdrop-filter: blur(var(--glass-blur));
    border: 1px solid var(--glass-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  /* Solid style fallback */
  :host([style='solid']) ha-card {
    background: var(--ha-card-background, #1e1e1e);
    backdrop-filter: none;
  }

  .card-content {
    padding: var(--spacing-lg);
  }

  .card-header {
    padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-sm);
    font-size: 14px;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Section styles */
  .section {
    margin-bottom: var(--spacing-md);
  }

  .section:last-child {
    margin-bottom: 0;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--glass-bg);
    border-radius: var(--radius-sm);
    cursor: pointer;
    user-select: none;
    transition: background 0.15s ease;
  }

  .section-header:hover {
    background: var(--glass-bg-hover);
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .section-icon {
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }

  .section-icon.sbahn {
    background: var(--sbahn-color);
  }

  .section-icon.tram {
    background: var(--tram-color);
  }

  .section-icon.bus {
    background: var(--bus-color);
  }

  .section-toggle {
    color: var(--text-muted);
    font-size: 12px;
    transition: transform 0.2s ease;
  }

  .section-toggle.collapsed {
    transform: rotate(-90deg);
  }

  .section-content {
    overflow: hidden;
    transition: max-height 0.25s ease, opacity 0.2s ease;
  }

  .section-content.collapsed {
    max-height: 0 !important;
    opacity: 0;
  }

  /* Departure row */
  .departure-row {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-sm) var(--spacing-md);
    border-bottom: 1px solid var(--glass-border);
    transition: background 0.15s ease;
  }

  .departure-row:last-child {
    border-bottom: none;
  }

  .departure-row:hover {
    background: var(--glass-bg);
  }

  .departure-row.cancelled {
    opacity: 0.4;
    text-decoration: line-through;
  }

  /* Line badge */
  .line-badge {
    min-width: 42px;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    color: white;
  }

  .line-badge.sbahn {
    background: var(--sbahn-color);
  }

  .line-badge.tram {
    background: var(--tram-color);
  }

  .line-badge.bus {
    background: var(--bus-color);
  }

  /* Direction/destination */
  .direction {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Time info */
  .time-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-family: var(--font-mono);
  }

  .delay {
    font-size: 12px;
    font-weight: 600;
    color: var(--delay-minor);
  }

  .delay.major {
    color: var(--delay-major);
  }

  .platform {
    font-size: 11px;
    color: var(--text-muted);
    background: var(--glass-bg);
    padding: 2px 6px;
    border-radius: 4px;
  }

  .time {
    font-size: 14px;
    color: var(--text-secondary);
    min-width: 42px;
    text-align: right;
  }

  .minutes {
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
    min-width: 50px;
    text-align: right;
  }

  .minutes.soon {
    color: var(--sbahn-color);
  }

  /* Status bar */
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--spacing-sm) var(--spacing-lg);
    font-size: 11px;
    color: var(--text-muted);
    border-top: 1px solid var(--glass-border);
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--text-muted);
  }

  .status-dot.live {
    background: var(--sbahn-color);
    box-shadow: 0 0 6px var(--sbahn-color);
  }

  .status-dot.loading {
    background: var(--delay-minor);
    animation: pulse 1s ease-in-out infinite;
  }

  .status-dot.error {
    background: var(--delay-major);
  }

  /* Loading state */
  .loading-skeleton {
    height: 40px;
    background: linear-gradient(
      90deg,
      var(--glass-bg) 25%,
      var(--glass-bg-hover) 50%,
      var(--glass-bg) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-sm);
    margin: var(--spacing-sm) 0;
  }

  /* Empty state */
  .empty-state {
    padding: var(--spacing-xl);
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
  }

  /* Error state */
  .error-state {
    padding: var(--spacing-lg);
    text-align: center;
    color: var(--delay-major);
    font-size: 13px;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;
