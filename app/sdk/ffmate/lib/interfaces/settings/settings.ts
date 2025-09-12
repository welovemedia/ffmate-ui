export interface Settings {
  general?: {
    port: number;
    database: string;
    maxConcurrentTasks: number;
    loglevel: string;
    debug: string;
  };
}
