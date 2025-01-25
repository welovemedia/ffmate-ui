import { defineStore } from "pinia";
import type { Watchfolder } from "~/sdk/ffmate/lib/interfaces/watchfolders/watchfolder";
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket";

const originalStore = defineStore("watchfolder", {
  state: (): { watchfolders: Watchfolder[]; total: number } => {
    return { watchfolders: [], total: 0 };
  },
  actions: {
    async delete() {},
    async load(page: number, perPage: number) {
      page = page ?? 0;
      perPage = perPage ?? 100;
      const { $ffmate } = useNuxtApp();
      const t = await $ffmate.Watchfolder.getWatchfolders(page, perPage);
      if (t) {
        this.watchfolders = t.items;
        this.total = t.total;
      }
    },
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const useWatchfolderStore = (): ReturnType<typeof originalStore> => {
  const { $ffmate } = useNuxtApp();
  if (!store.value) {
    store.value = originalStore();

    const updates = ref<WebsocketMessage[]>([]);

    // a queue to apply updates to not over-update views
    useIntervalFn(() => {
      const tmpUpdates = [...updates.value];
      updates.value = [];
      for (const data of tmpUpdates) {
        switch (data.subject) {
          case "watchfolder:created":
            store.value!.watchfolders.unshift(data.payload as Watchfolder);
            break;
          case "watchfolder:updated":
            store.value!.watchfolders = store.value!.watchfolders.map((t) => {
              if (t.uuid === (data.payload as Watchfolder).uuid) {
                return data.payload as Watchfolder;
              }
              return t;
            });
            break;
          case "watchfolder:deleted":
            store.value!.watchfolders = store.value!.watchfolders.filter(
              (t) => t.uuid !== (data.payload as Watchfolder).uuid
            );
            break;
        }
      }
    }, 250);

    $ffmate.Websocket.connect({
      onAdd: (data: WebsocketMessage) => {
        updates.value.push(data);
      },
      onUpdate: (data: WebsocketMessage) => {
        updates.value.push(data);
      },
      onDelete: (data: WebsocketMessage) => {
        updates.value.push(data);
      },
    });
  }
  return store.value;
};
