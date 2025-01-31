import { defineStore } from "pinia"
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket"

const originalStore = defineStore("logs", {
  state: (): { logs: string[]; open: boolean } => {
    return { logs: [], open: false }
  },
  actions: {},
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useLogStore = (): ReturnType<typeof originalStore> => {
  const { $ffmate } = useNuxtApp()
  if (!store.value) {
    store.value = originalStore()

    $ffmate.Websocket.connect({
      onAdd: (data: WebsocketMessage) => {
        if (data.subject === "log:created") {
          if (store.value) {
            store.value.logs.push(data.payload as string)
            if (store.value.logs.length > 500) {
              store.value.logs.shift()
            }
          }
        }
      },
    })
  }
  return store.value
}
