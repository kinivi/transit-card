/**
 * Format time as HH:MM in 24h format
 */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Calculate minutes until departure
 */
export function minutesUntil(departureTime: Date, now: Date = new Date()): number {
  const diffMs = departureTime.getTime() - now.getTime();
  return Math.floor(diffMs / 60000);
}

/**
 * Format minutes until departure for display
 */
export function formatMinutesUntil(minutes: number): string {
  if (minutes <= 0) return 'jetzt';
  if (minutes === 1) return '1 min';
  return `${minutes} min`;
}

/**
 * Format delay for display (German convention: +3)
 */
export function formatDelay(delayMinutes: number): string {
  if (delayMinutes <= 0) return '';
  return `+${delayMinutes}`;
}

/**
 * Format platform for display (German: Gl. for Gleis)
 */
export function formatPlatform(platform: string | null): string {
  if (!platform) return '';
  return `Gl. ${platform}`;
}
