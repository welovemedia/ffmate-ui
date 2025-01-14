export interface Task {
  uuid: string;
  name?: string;

  batch?: string;

  resolved?: {
    command: string;
    inputFile: string;
    outputFile: string;
    postProcessing?: {
      scriptPath?: string;
      sidecarPath?: string;
    };
  };

  command: string;
  inputFile: string;
  outputFile: string;

  status: string;
  progress: number;

  error?: string;

  priority: number;

  startedAt?: number;
  finishedAt?: number;

  createdAt: number;
  updatedAt: number;

  postProcessing?: {
    scriptPath?: string;
    sidecarPath?: string;
    error?: string;
    startedAt?: number;
    finishedAt?: number;
  };
}
