export interface Task {
  uuid: string;
  name?: string;

  batch?: string;

  inputFile: string;
  outputFile: string;

  status: string;
  progress: number;

  priority: number;

  createdAt: string;
  updatedAt: string;

  postProcessing?: { scriptPath: string; sidecarPath: string };
}
