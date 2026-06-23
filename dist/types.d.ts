export interface HomeAssistant {
    states: Record<string, HassEntity>;
    callService: (domain: string, service: string, data?: object) => Promise<void>;
    language: string;
}
export interface HassEntity {
    entity_id: string;
    state: string;
    attributes: Record<string, unknown>;
    last_changed: string;
    last_updated: string;
}
export type TransitType = 'sbahn' | 'tram' | 'bus';
export declare const TRANSIT_TYPES: TransitType[];
export type EntitySource = string | {
    entity: string;
};
export declare function resolveEntityId(source: EntitySource | undefined | null): string | undefined;
export interface StopLocation {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}
export interface MapConfig {
    zoom?: number;
    center?: {
        lat: number;
        lng: number;
    };
    stops?: Record<string, {
        lat: number;
        lng: number;
    }>;
}
export interface StopConfig {
    sbahn?: EntitySource;
    tram?: EntitySource;
    bus?: EntitySource;
}
export interface TransitCardConfig {
    type: string;
    title?: string;
    layout?: 'list' | 'map';
    stops?: StopConfig;
    map?: MapConfig;
    max_departures?: number;
    collapsed?: TransitType[];
    style?: 'glass' | 'solid';
    stale_threshold?: number;
}
export interface DeparturePayload {
    line: string;
    direction: string;
    planned: string;
    when?: string | null;
    delay?: number;
    platform?: string | null;
    cancelled?: boolean;
    id?: string;
    directionArrow?: 'left' | 'right' | null;
    stopName?: string;
    lat?: number;
    lng?: number;
}
export interface Departure {
    id: string;
    line: string;
    direction: string;
    plannedTime: Date;
    actualTime: Date | null;
    delay: number;
    platform: string | null;
    cancelled: boolean;
    stopName: string;
    type: TransitType;
    directionArrow?: 'left' | 'right' | null;
    lat?: number;
    lng?: number;
}
export interface GroupedDepartures {
    sbahn: Departure[];
    tram: Departure[];
    bus: Departure[];
}
export interface CustomCardEntry {
    type: string;
    name: string;
    description: string;
    preview?: boolean;
    documentationURL?: string;
}
declare global {
    interface Window {
        customCards?: CustomCardEntry[];
    }
}
//# sourceMappingURL=types.d.ts.map