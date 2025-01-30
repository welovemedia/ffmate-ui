import { defineStore } from "pinia"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket"

const originalStore = defineStore("tasks", {
  state: (): {
    tasks: (Task & { lastRemaining?: number })[]
    total: number
    loaded: boolean
  } => {
    return { tasks: [], total: 0, loaded: false }
  },
  actions: {
    async delete(uuid: string) {
      useFFMate().Tasks.deletetTask(uuid)
    },
    async cancel(uuid: string) {
      useFFMate().Tasks.cancelTask(uuid)
    },
    async restart(uuid: string) {
      useFFMate().Tasks.restartTask(uuid)
    },
    async load(page: number, perPage: number, status?: string) {
      page = page ?? 0
      perPage = perPage ?? 100
      const t = await useFFMate().Tasks.getTasks(page, perPage, status)
      this.loaded = true
      if (t) {
        this.tasks = t.items
        this.total = t.total
      }
    },
  },
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useTaskStore = (): ReturnType<typeof originalStore> => {
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
                return {
                  ...(data.payload as Task),
                  lastRemaining:
                    (data.payload as Task).remaining > 0
                      ? (data.payload as Task).remaining
                      : t.lastRemaining ?? -1,
                }
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

    useFFMate().Websocket.connect({
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
