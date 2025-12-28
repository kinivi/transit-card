import type { ApiDeparture, ApiResponse, Departure, TransitType, GroupedDepartures } from '../types';

const DB_API_BASE = 'https://v6.db.transport.rest';
const DEPARTURE_DURATION = 60;

// Default stops for Weststadt
const DEFAULT_STOPS = {
  sbahn: ['8002681'],           // Weststadt/Südstadt
  tram: ['506913', '506953'],   // Christuskirche, Römerkreis Süd
  bus: ['518175', '506901'],    // Kaiserstraße, Alois-Link-Platz
};

// CORS proxy options
const CORS_PROXIES = [
  '', // Try direct first
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
];

let workingProxyIndex = 0;

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

async function fetchWithProxy(url: string, proxyUrl?: string): Promise<Response> {
  // If custom proxy provided, use it
  if (proxyUrl) {
    const proxiedUrl = proxyUrl + encodeURIComponent(url);
    return fetch(proxiedUrl);
  }

  // Try proxies in order, starting from last working one
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    const proxyIndex = (workingProxyIndex + i) % CORS_PROXIES.length;
    const proxy = CORS_PROXIES[proxyIndex];

    try {
      const fetchUrl = proxy ? proxy + encodeURIComponent(url) : url;
      const response = await fetch(fetchUrl, {
        signal: AbortSignal.timeout(10000), // 10s timeout
      });

      if (response.ok) {
        workingProxyIndex = proxyIndex; // Remember working proxy
        return response;
      }
    } catch (e) {
      console.log(`[transit-card] Proxy ${proxyIndex} failed, trying next...`);
    }
  }

  throw new Error('All proxies failed');
}

async function fetchDepartures(
  stopId: string,
  type: TransitType,
  proxyUrl?: string
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

    const response = await fetchWithProxy(url.toString(), proxyUrl);

    if (!response.ok) {
      console.error(`[transit-card] API error for ${stopId}: ${response.status}`);
      return [];
    }

    const data: ApiResponse = await response.json();

    return (data.departures || [])
      .map((dep) => parseDeparture(dep, stopId, type))
      .filter((dep) => !dep.cancelled)
      .sort((a, b) => a.plannedTime.getTime() - b.plannedTime.getTime());
  } catch (error) {
    console.error(`[transit-card] Failed to fetch ${type} departures for ${stopId}:`, error);
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
    proxy_url?: string;
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
    Promise.all(stops.sbahn.map((id) => fetchDepartures(id, 'sbahn', config?.proxy_url))),
    Promise.all(stops.tram.map((id) => fetchDepartures(id, 'tram', config?.proxy_url))),
    Promise.all(stops.bus.map((id) => fetchDepartures(id, 'bus', config?.proxy_url))),
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
