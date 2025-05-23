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

export interface NewPreset {
  name: string;
  description: string;

  command: string;
  priority: number;
  outputFile: string;

  preProcessing?: PrePostProcessing;
  postProcessing?: PrePostProcessing;

  globalPresetName?: string;
}

export interface PrePostProcessing {
  scriptPath?: string;
  sidecarPath?: string;
}
