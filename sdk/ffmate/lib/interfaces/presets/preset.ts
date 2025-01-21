interface PrePostProcessingReduced {
  scriptPath?: string;
  sidecarPath?: string;
}

export interface Preset {
  uuid: string;

  name?: string;
  description?: string;

  command?: string;
  outputFile?: string;

  priority: number;

  createdAt: number;
  updatedAt: number;

  preProcessing?: PrePostProcessingReduced;
  postProcessing?: PrePostProcessingReduced;
}
