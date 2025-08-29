export enum WebhookEvent {
  BATCH_CREATED = "batch.created",
  BATCH_FINISHED = "batch.finished",

  TASK_CREATED = "task.created",
  TASK_UPDATED = "task.updated",
  TASK_DELETED = "task.deleted",

  PRESET_CREATED = "preset.created",
  PRESET_UPDATED = "preset.updated",
  PRESET_DELETED = "preset.deleted",

  WEBHOOK_CREATED = "webhook.created",
  WEBHOOK_UPDATED = "webhook.updated",
  WEBHOOK_DELETED = "webhook.deleted",

  WATCHFOLDER_CREATED = "watchfolder.created",
  WATCHFOLDER_UPDATED = "watchfolder.updated",
  WATCHFOLDER_DELETED = "watchfolder.deleted",
}

export interface Webhook {
  uuid: string

  event: WebhookEvent
  url: string

  createdAt: number
  updatedAt: number
}

export interface NewWebhook {
  event: WebhookEvent
  url: string
}
