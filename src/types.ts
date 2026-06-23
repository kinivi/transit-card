// Home Assistant types
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

// Transit types
export type TransitType = 'sbahn' | 'tram' | 'bus';
export const TRANSIT_TYPES: TransitType[] = ['sbahn', 'tram', 'bus'];

// A configured source: either { entity: "sensor.x" } or the bare entity-id string.
export type EntitySource = string | { entity: string };

// Resolve an EntitySource to its entity-id (trimmed), or undefined if empty/absent.
export function resolveEntityId(source: EntitySource | undefined | null): string | undefined {
  if (!source) return undefined;
  const id = typeof source === 'string' ? source : source.entity;
  const trimmed = (id || '').trim();
  return trimmed || undefined;
}

// Stop location with coordinates (for the optional map layout)
export interface StopLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Map configuration
export interface MapConfig {
  zoom?: number;
  center?: { lat: number; lng: number };
  // Optional per-station coordinates, keyed by the station name as it appears in the
  // departure payload's `stopName`. Used when the payload itself carries no lat/lng.
  stops?: Record<string, { lat: number; lng: number }>;
}

// Each transit type maps to a single Home Assistant entity.
export interface StopConfig {
  sbahn?: EntitySource;
  tram?: EntitySource;
  bus?: EntitySource;
}

// Card configuration
export interface TransitCardConfig {
  type: string;
  title?: string;
  layout?: 'list' | 'map';
  stops?: StopConfig;
  map?: MapConfig;
  max_departures?: number;
  collapsed?: TransitType[];
  style?: 'glass' | 'solid';
  // Seconds after which the newest source `last_updated` is considered stale (default 180).
  stale_threshold?: number;
}

// JSON contract: the shape of each element in `attributes.departures` on the source
// entity. Times are ISO 8601; `delay` is in MINUTES (normalized server-side); unknown
// extra fields are ignored and missing optional fields degrade gracefully.
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

// Internal, parsed departure consumed by the rendering components.
export interface Departure {
  id: string;
  line: string;
  direction: string;
  plannedTime: Date;
  actualTime: Date | null;
  delay: number; // minutes
  platform: string | null;
  cancelled: boolean;
  stopName: string;
  type: TransitType;
  directionArrow?: 'left' | 'right' | null;
  lat?: number;
  lng?: number;
}

// Grouped departures for display
export interface GroupedDepartures {
  sbahn: Departure[];
  tram: Departure[];
  bus: Departure[];
}

// Card picker registration
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
