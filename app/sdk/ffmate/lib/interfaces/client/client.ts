export interface Client {
  version: string;
  os: string;
  arch: string;
  ffmpeg: string;
  lastSeen: number;
  self?: boolean;

  identifier: string;
  clister: string;
  session: string;
}
