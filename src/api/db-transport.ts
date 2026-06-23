// Pure parser for departures sourced from Home Assistant entity attributes.
//
// NOTE: despite the file name, this module no longer talks to Deutsche Bahn or any
// network at all. The single rate-limited poll now lives on the HA side (a REST sensor
// hitting a self-hosted db-vendo-client). The card only reads `attributes.departures`
// off the source entity and normalizes it into the internal `Departure` shape.

import type { HassEntity, Departure, DeparturePayload, TransitType } from '../types';

const PAST_GRACE_MS = 60_000; // 1 minute
const MAX_DELAY_MINUTES = 60; // hide implausible delays

function toDateOrNull(iso: unknown): Date | null {
  if (typeof iso !== 'string' || !iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

function coerceDeparture(
  raw: DeparturePayload,
  type: TransitType,
  index: number
): Departure | null {
  const plannedTime = toDateOrNull(raw.planned);
  const actualTime = toDateOrNull(raw.when);

  // `planned` drives all time math; fall back to realtime `when`, else drop the entry.
  const effectivePlanned = plannedTime ?? actualTime;
  if (!effectivePlanned) return null;

  const delay = typeof raw.delay === 'number' && isFinite(raw.delay) ? Math.round(raw.delay) : 0;
  const arrow =
    raw.directionArrow === 'left' || raw.directionArrow === 'right' ? raw.directionArrow : null;

  return {
    id:
      typeof raw.id === 'string' && raw.id
        ? raw.id
        : `${type}-${index}-${typeof raw.line === 'string' ? raw.line : '?'}`,
    line: typeof raw.line === 'string' && raw.line ? raw.line : '?',
    direction: typeof raw.direction === 'string' && raw.direction ? raw.direction : 'Unbekannt',
    plannedTime: effectivePlanned,
    actualTime,
    delay,
    platform: typeof raw.platform === 'string' ? raw.platform : null,
    cancelled: raw.cancelled === true,
    stopName: typeof raw.stopName === 'string' ? raw.stopName : '',
    type,
    directionArrow: arrow,
    lat: typeof raw.lat === 'number' ? raw.lat : undefined,
    lng: typeof raw.lng === 'number' ? raw.lng : undefined,
  };
}

// Parse `attributes.departures` off a source entity into internal Departures.
// Unknown fields are ignored; malformed entries are skipped rather than throwing.
export function parseDeparturesFromState(
  entity: HassEntity | undefined,
  type: TransitType
): Departure[] {
  if (!entity) return [];
  const raw = (entity.attributes as Record<string, unknown> | undefined)?.departures;
  if (!Array.isArray(raw)) return [];

  const out: Departure[] = [];
  raw.forEach((item, i) => {
    if (item && typeof item === 'object') {
      const dep = coerceDeparture(item as DeparturePayload, type, i);
      if (dep) out.push(dep);
    }
  });
  return out;
}

// Re-applied at render time (the source entity updates ~1/min, the clock ticks every
// second): hide cancelled, hide past (effective time + 1 min grace), hide implausible
// delays, and sort by effective departure time.
export function filterAndSortDepartures(deps: Departure[], now: Date): Departure[] {
  const nowMs = now.getTime();
  const effective = (d: Departure) => (d.actualTime ?? d.plannedTime).getTime();

  return deps
    .filter((dep) => {
      if (dep.cancelled) return false;
      if (effective(dep) < nowMs - PAST_GRACE_MS) return false;
      if (dep.delay > MAX_DELAY_MINUTES) return false;
      return true;
    })
    .sort((a, b) => effective(a) - effective(b));
}
