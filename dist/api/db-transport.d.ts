import type { HassEntity, Departure, TransitType } from '../types';
export declare function parseDeparturesFromState(entity: HassEntity | undefined, type: TransitType): Departure[];
export declare function filterAndSortDepartures(deps: Departure[], now: Date): Departure[];
//# sourceMappingURL=db-transport.d.ts.map