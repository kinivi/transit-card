import type { ApiDeparture, ApiResponse, Departure, TransitType, GroupedDepartures } from '../types';

const DB_API_BASE = 'https://v6.db.transport.rest';
const DEPARTURE_DURATION = 60;

// Default stops for Weststadt
const DEFAULT_STOPS = {
  sbahn: ['8002681'],           // Weststadt/Südstadt
  tram: ['506913', '506953'],   // Christuskirche, Römerkreis Süd
  bus: ['518175'],              // Kaiserstraße
};

function parseDeparture(
  apiDep: ApiDeparture,
  stopId: string,
  type: TransitType
): Departure {
  const plannedTime = new Date(apiDep.plannedWhen);
  const actualTime = apiDep.when ? new Date(apiDep.when) : null;
  const delayMinutes = apiDep.delay ? Math.round(apiDep.delay / 60) : 0;

  return {
    id: apiDep.tripId,
    line: apiDep.line?.name || '?',
    direction: apiDep.direction || 'Unbekannt',
    plannedTime,
    actualTime,
    delay: delayMinutes,
    platform: apiDep.platform,
    cancelled: apiDep.cancelled || false,
    stopName: apiDep.stop?.name || '',
    stopId,
    type,
  };
}

async function fetchDepartures(
  stopId: string,
  type: TransitType
): Promise<Departure[]> {
  try {
    const url = new URL(`${DB_API_BASE}/stops/${stopId}/departures`);
    url.searchParams.set('duration', String(DEPARTURE_DURATION));

    // Filter by transit type
    url.searchParams.set('suburban', type === 'sbahn' ? 'true' : 'false');
    url.searchParams.set('tram', type === 'tram' ? 'true' : 'false');
    url.searchParams.set('bus', type === 'bus' ? 'true' : 'false');
    url.searchParams.set('regional', 'false');
    url.searchParams.set('express', 'false');
    url.searchParams.set('ferry', 'false');

    const response = await fetch(url.toString());

    if (!response.ok) {
      console.error(`API error for ${stopId}: ${response.status}`);
      return [];
    }

    const data: ApiResponse = await response.json();

    return (data.departures || [])
      .map((dep) => parseDeparture(dep, stopId, type))
      .filter((dep) => !dep.cancelled)
      .sort((a, b) => a.plannedTime.getTime() - b.plannedTime.getTime());
  } catch (error) {
    console.error(`Failed to fetch ${type} departures for ${stopId}:`, error);
    return [];
  }
}

function normalizeStops(stops: string | string[] | undefined): string[] {
  if (!stops) return [];
  return Array.isArray(stops) ? stops : [stops];
}

function getStopsOrDefault(stops: string | string[] | undefined, defaults: string[]): string[] {
  const normalized = normalizeStops(stops);
  return normalized.length > 0 ? normalized : defaults;
}

export async function fetchAllDepartures(
  config?: {
    sbahn?: string | string[];
    tram?: string | string[];
    bus?: string | string[];
  }
): Promise<GroupedDepartures> {
  const stops = {
    sbahn: getStopsOrDefault(config?.sbahn, DEFAULT_STOPS.sbahn),
    tram: getStopsOrDefault(config?.tram, DEFAULT_STOPS.tram),
    bus: getStopsOrDefault(config?.bus, DEFAULT_STOPS.bus),
  };

  console.log('[transit-card] Fetching departures for stops:', stops);

  // Fetch all in parallel
  const [sbahnResults, tramResults, busResults] = await Promise.all([
    Promise.all(stops.sbahn.map((id) => fetchDepartures(id, 'sbahn'))),
    Promise.all(stops.tram.map((id) => fetchDepartures(id, 'tram'))),
    Promise.all(stops.bus.map((id) => fetchDepartures(id, 'bus'))),
  ]);

  // Flatten and sort by time
  const sortByTime = (deps: Departure[]) =>
    deps.sort((a, b) => a.plannedTime.getTime() - b.plannedTime.getTime());

  const result = {
    sbahn: sortByTime(sbahnResults.flat()),
    tram: sortByTime(tramResults.flat()),
    bus: sortByTime(busResults.flat()),
  };

  console.log('[transit-card] Fetched departures:', {
    sbahn: result.sbahn.length,
    tram: result.tram.length,
    bus: result.bus.length,
  });

  return result;
}
