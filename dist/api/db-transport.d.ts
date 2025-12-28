import type { GroupedDepartures } from '../types';
export declare function fetchAllDepartures(config?: {
    sbahn?: string | string[];
    tram?: string | string[];
    bus?: string | string[];
    proxy_url?: string;
}): Promise<GroupedDepartures>;
//# sourceMappingURL=db-transport.d.ts.map