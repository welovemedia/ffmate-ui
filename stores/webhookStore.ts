import { defineStore } from "pinia"
import type { Webhook } from "~/sdk/ffmate/lib/interfaces/webhooks/webhook"
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket"

const originalStore = defineStore("webhook", {
  state: (): { webhooks: Webhook[]; total: number } => {
    return { webhooks: [], total: 0 }
  },
  actions: {
    async delete(uuid: string) {
      await useFFMate().Webhook.delete(uuid)
    },
    async load(page: number, perPage: number) {
      page = page ?? 0
      perPage = perPage ?? 100
      const { $ffmate } = useNuxtApp()
      const t = await $ffmate.Webhook.getWebhooks(page, perPage)
      if (t) {
        this.webhooks = t.items
        this.total = t.total
      }
    },
  },
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useWebhookStore = (): ReturnType<typeof originalStore> => {
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
          case "webhook:created":
            store.value!.webhooks.unshift(data.payload as Webhook)
            break
          case "webhook:updated":
            store.value!.webhooks = store.value!.webhooks.map((t) => {
              if (t.uuid === (data.payload as Webhook).uuid) {
                return data.payload as Webhook
              }
              return t
            })
            break
          case "webhook:deleted":
            store.value!.webhooks = store.value!.webhooks.filter(
              (t) => t.uuid !== (data.payload as Webhook).uuid
            )
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
