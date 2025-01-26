export interface Task {
  uuid: string;
  name?: string;

  batch?: string;

  command: RawResolved;
  inputFile: RawResolved;
  outputFile: RawResolved;

  status:
    | "QUEUED"
    | "RUNNING"
    | "DONE_SUCCESSFUL"
    | "DONE_ERROR"
    | "DONE_CANCELED";
  progress: number;

  error?: string;

  priority: number;

  source: "watchfolder" | "api";

  startedAt?: number;
  finishedAt?: number;

  createdAt: number;
  updatedAt: number;

  preProcessing?: PrePostProcessing;

  postProcessing?: PrePostProcessing;
}

interface PrePostProcessing {
  scriptPath?: RawResolved;
  sidecarPath?: RawResolved;
  error?: string;
  startedAt?: number;
  finishedAt?: number;
}

interface RawResolved {
  raw: string;
  resolved?: string;
}
