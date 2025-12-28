/**
 * Format time as HH:MM in 24h format
 */
export declare function formatTime(date: Date): string;
/**
 * Calculate minutes until departure
 */
export declare function minutesUntil(departureTime: Date, now?: Date): number;
/**
 * Format minutes until departure for display
 */
export declare function formatMinutesUntil(minutes: number): string;
/**
 * Format delay for display (German convention: +3)
 */
export declare function formatDelay(delayMinutes: number): string;
/**
 * Format platform for display (German: Gl. for Gleis)
 */
export declare function formatPlatform(platform: string | null): string;
//# sourceMappingURL=time.d.ts.map