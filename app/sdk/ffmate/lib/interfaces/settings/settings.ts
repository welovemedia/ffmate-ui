export interface Settings {
  general?: {
    port: number;
    database: string;
    ffmpeg: string;
    maxConcurrentTasks: number;
    loglevel: string;
    debug: string;
  };
}
