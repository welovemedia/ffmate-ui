export interface Client {
  version: string;
  os: string;
  arch: string;
  ffmpeg: string;
  maxConcurrentTasks: string;
  labels?: string[];
  lastSeen: number;
  self?: boolean;

  identifier: string;
  cluster: string;
  session: string;
}
