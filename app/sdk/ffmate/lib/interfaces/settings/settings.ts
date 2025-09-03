export interface Settings {
  general?: {
    port: number;
    database: string;
    ffmpeg: string;
  };
  ai?: {
    enabled: boolean;
    model: string;
    apiKey: string;
  };
}
