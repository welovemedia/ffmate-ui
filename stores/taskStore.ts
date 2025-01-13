import { defineStore } from "pinia"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket"

const originalStore = defineStore("tasks", {
  state: (): { tasks: Task[] } => {
    return { tasks: [] }
  },
  actions: {
    async load() {
      const { $ffmate } = useNuxtApp()
      const t = await $ffmate.Tasks.getTasks()
      if (t) {
        this.tasks = t
      }
    },
  },
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useTaskStore = (): ReturnType<typeof originalStore> => {
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
          case "task:created":
            store.value!.tasks.unshift(data.payload as Task)
            break
          case "task:updated":
            store.value!.tasks = store.value!.tasks.map((t) => {
              if (t.uuid === (data.payload as Task).uuid) {
                return data.payload as Task
              }
              return t
            })
            break
          case "task:deleted":
            store.value!.tasks = store.value!.tasks.filter(
              (t) => t.uuid !== (data.payload as Task).uuid
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
