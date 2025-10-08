import type { Client } from "../client/client";
import type { NewWebhook } from "../webhooks/webhook";

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
    | "DONE_CANCELED"
    | "PRE_PROCESSING"
    | "POST_PROCESSING"
    | "";
  progress: number;
  remaining: number;
  lastRemaining: number;

  error?: string;

  retries: number;
  retried: number;

  priority: number;

  webhooks?: NewWebhook[];

  source: "watchfolder" | "api";

  labels?: string[];

  startedAt?: number;
  finishedAt?: number;

  createdAt: number;
  updatedAt: number;

  client?: Client;

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
