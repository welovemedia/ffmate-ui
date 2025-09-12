export interface Watchfolder {
    uuid: string;

    name?: string;
    description?: string;

    path: string;
    interval: number;
    growthChecks: number;

    suspended: boolean;

    createdAt: number;
    updatedAt: number;
    lastCheck: number;

    error?: string;

    filter?: WatchfolderFilter;

    preset: string;
}

export interface NewWatchfolder {
    name: string;
    description?: string;

    path: string;
    interval: number;
    growthChecks: number;

    filter?: WatchfolderFilter;

    preset: string;
}

export interface WatchfolderFilter {
    extensions?: WatchfolderFilterExtension;
}

export interface WatchfolderFilterExtension {
    include: string[];
    exclude: string[];
}
