import { defineStore } from "pinia"
import type { WebhookExecution } from "~/sdk/ffmate/lib/interfaces/webhooks/webhook"
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket"

const originalStore = defineStore("webhookExecutions", {
  state: (): { executions: WebhookExecution[]; total: number } => {
    return { executions: [], total: 0 }
  },
  actions: {
    async load(page: number, perPage: number) {
      page = page ?? 0
      perPage = perPage ?? 100
      const { $ffmate } = useNuxtApp()
      const t = await $ffmate.Webhook.getWebhookExecutions(page, perPage)
      if (t) {
        this.executions = t.items
        this.total = t.total
      }
    },
  },
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useWebhookExecutionStore = (): ReturnType<
  typeof originalStore
> => {
  const { $ffmate } = useNuxtApp()
  if (!store.value) {
    store.value = originalStore()

    const updates = ref<WebsocketMessage[]>([])

    // a queue to apply updates to not over-update views
    useIntervalFn(() => {
      const tmpUpdates = [...updates.value]
      updates.value = []
      for (const data of tmpUpdates) {
        switch (data.subject) {
          case "webhookExecution:created":
            store.value!.executions.unshift(data.payload as WebhookExecution)
            if (store.value!.executions.length > useConfig().perPage) {
              store.value!.executions.pop()
            }
            break
        }
      }
    }, 250)

    $ffmate.Websocket.connect({
      onAdd: (data: WebsocketMessage) => {
        updates.value.push(data)
      },
      onUpdate: (data: WebsocketMessage) => {
        updates.value.push(data)
      },
      onDelete: (data: WebsocketMessage) => {
        updates.value.push(data)
      },
    })
  }

  return store.value
}
