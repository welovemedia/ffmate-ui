import type { NewWebhook } from "../webhooks/webhook";

interface PrePostProcessingReduced {
  scriptPath?: string;
  sidecarPath?: string;
  importSidecar?: boolean;
}

export interface Preset {
  uuid: string;

  name: string;
  description?: string;

  command: string;
  priority: number;
  outputFile?: string;

  retries: number;

  labels?: string[];

  webhooks?: NewWebhook[];

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

  retries: number;

  labels?: string[];

  webhooks?: NewWebhook[];

  preProcessing?: PrePostProcessing;
  postProcessing?: PrePostProcessing;

  globalPresetName?: string;
}

export interface PrePostProcessing {
  scriptPath?: string;
  sidecarPath?: string;
  importSidecar?: boolean;
}
