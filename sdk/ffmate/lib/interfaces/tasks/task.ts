export interface Task {
  uuid: string;
  name?: string;

  batch?: string;

  command: RawResolved;
  inputFile: RawResolved;
  outputFile: RawResolved;

  status: string;
  progress: number;

  error?: string;

  priority: number;

  startedAt?: number;
  finishedAt?: number;

  createdAt: number;
  updatedAt: number;

  preProcessing?: {
    scriptPath?: RawResolved;
    sidecarPath?: RawResolved;
    error?: string;
    startedAt?: number;
    finishedAt?: number;
  };

  postProcessing?: {
    scriptPath?: RawResolved;
    sidecarPath?: RawResolved;
    error?: string;
    startedAt?: number;
    finishedAt?: number;
  };
}

interface RawResolved {
  raw: string;
  resolved?: string;
}
