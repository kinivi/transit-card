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

// Card configuration
export interface TransitCardConfig {
  type: string;
  title?: string;
  stops?: StopConfig;
  refresh_interval?: number;
  max_departures?: number;
  collapsed?: TransitType[];
  style?: 'glass' | 'solid';
  proxy_url?: string;
}

export interface StopConfig {
  sbahn?: string | string[];
  tram?: string | string[];
  bus?: string | string[];
  proxy_url?: string;
}

// Transit types
export type TransitType = 'sbahn' | 'tram' | 'bus';

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
  stopId: string;
  type: TransitType;
}

// API response types
export interface ApiDeparture {
  tripId: string;
  line: {
    name: string;
    fahrtNr?: string;
    type?: string;
    product?: {
      type?: string;
    };
  };
  direction: string;
  plannedWhen: string;
  when: string | null;
  delay: number | null;
  platform: string | null;
  cancelled?: boolean;
  stop?: {
    id: string;
    name: string;
  };
}

export interface ApiResponse {
  departures: ApiDeparture[];
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
