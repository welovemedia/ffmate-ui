import { defineStore } from "pinia"
import type { Preset } from "~/sdk/ffmate/lib/interfaces/presets/preset"
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket"

const originalStore = defineStore("preset", {
  state: (): { presets: Preset[]; total: number } => {
    return { presets: [], total: 0 };
  },
  actions: {
    async delete(uuid: string) {
      const { $ffmate } = useNuxtApp()
      await $ffmate.Preset.delete(uuid)
    },
    async load(page: number, perPage: number) {
      page = page ?? 0;
      perPage = perPage ?? 100;
      const { $ffmate } = useNuxtApp();
      const t = await $ffmate.Preset.getPresets(page, perPage);
      if (t) {
        this.presets = t.items;
        this.total = t.total;
      }
    },
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const usePresetStore = (): ReturnType<typeof originalStore> => {
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
          case "preset:created":
            store.value!.presets.unshift(data.payload as Preset);
            break;
          case "preset:updated":
            store.value!.presets = store.value!.presets.map((t) => {
              if (t.uuid === (data.payload as Preset).uuid) {
                return data.payload as Preset;
              }
              return t;
            });
            break;
          case "preset:deleted":
            store.value!.presets = store.value!.presets.filter(
              (t) => t.uuid !== (data.payload as Preset).uuid,
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
