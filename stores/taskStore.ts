import { defineStore } from "pinia";
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task";
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket";

const originalStore = defineStore("tasks", {
  state: (): { tasks: Task[] } => {
    return { tasks: [] };
  },
  actions: {
    async load() {
      const { $ffmate } = useNuxtApp();
      const t = await $ffmate.Tasks.getTasks();
      if (t) {
        this.tasks = t;
      }
    },
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const useTaskStore = (): ReturnType<typeof originalStore> => {
  const { $ffmate } = useNuxtApp();
  if (!store.value) {
    store.value = originalStore();
    $ffmate.Websocket.connect({
      onAdd: (data: WebsocketMessage) => {
        if (data.subject === "task:created") {
          store.value!.tasks.unshift(data.payload as Task);
        }
      },
      onUpdate: (data: WebsocketMessage) => {
        if (data.subject === "task:updated") {
          store.value!.tasks = store.value!.tasks.map((t) => {
            if (t.uuid === (data.payload as Task).uuid) {
              return data.payload as Task;
            }
            return t;
          });
        }
      },
      onDelete: (data: WebsocketMessage) => {
        if (data.subject === "task:updated") {
          store.value!.tasks = store.value!.tasks.filter(
            (t) => t.uuid !== (data.payload as Task).uuid
          );
        }
      },
    });
  }
  return store.value;
};
