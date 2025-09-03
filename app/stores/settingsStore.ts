import { defineStore } from "pinia";
import type { Settings } from "~/sdk/ffmate/lib/interfaces/settings/settings";
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket";

const originalStore = defineStore("settings", {
  state: (): {
    settings: Settings;
    hasLoaded: boolean;
  } => {
    return {
      settings: {},
      hasLoaded: false,
    };
  },
  actions: {
    async load() {
      const t = await useFFMate().Settings.load();
      if (t) {
        this.settings = t;
        this.hasLoaded = true;
      }
    },
    async waitUntilLoaded() {
      if (this.hasLoaded) return; // already loaded

      return new Promise<void>((resolve) => {
        const check = () => {
          if (this.hasLoaded) {
            resolve();
          } else {
            setTimeout(check, 50);
          }
        };
        check();
      });
    },

    async save() {
      await useFFMate().Settings.save(this.settings);
      return this;
    },
    setSettings(settings: Settings) {
      this.settings = { ...this.settings, ...settings };
      return this;
    },
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const useSettingsStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore();

    useFFMate().Websocket.connect({
      onUpdate: (data: WebsocketMessage) => {
        if (data.subject === "settings:updated") {
          store.value!.setSettings(data.payload as Settings);
        }
      },
    });
  }
  return store.value;
};
