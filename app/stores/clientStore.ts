import axios from "axios";
import { defineStore } from "pinia";
import type { Client } from "~/sdk/ffmate/lib/interfaces/client/client";
import type { WebsocketMessage } from "~/sdk/ffmate/lib/services/websocket";

interface Update {
  Version: string;
  Sha256: string;
}

const originalStore = defineStore("client", {
  state: (): {
    clients: Client[];
    latestVersion?: string;
  } => {
    return { clients: [], latestVersion: undefined };
  },
  getters: {
    selfClient: (state) => {
      return state.clients.find((c) => c.self) || undefined;
    },
    isUpdateAvailable: (state) => {
      if (!state.latestVersion) return false;
      return state.clients.find((c) => c.self)?.version !== state.latestVersion;
    },
    isFFmpegFound: (state) => {
      return (
        state.clients.find((c) => c.self) &&
        state.clients.find((c) => c.self)?.ffmpeg != ""
      );
    },
    isReady: (state) => {
      return state.latestVersion !== undefined && state.clients.length > 0;
    },
  },
  actions: {
    async loadClients() {
      const c = await useFFMate().Client.getClients();
      if (c) {
        this.clients = c;
      }
    },
    async useCheckForUpdates() {
      const version = (
        await axios.get<Update>(
          "https://earth.ffmate.io/_update/ffmate/darwin-arm64.json",
        )
      )?.data?.Version;
      if (version) {
        this.latestVersion = version;
      }
    },
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const useClientStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore();

    store.value.loadClients();

    useIntervalFn(
      () => {
        console.log("loadad");
        store.value!.useCheckForUpdates();
      },
      1000 * 60 * 60, // every hour
      { immediateCallback: true },
    );
  }

  useFFMate().Websocket.connect({
    onUpdate: (data: WebsocketMessage) => {
      if (data.subject !== "client:updated") return;

      const payload = data.payload as Client;
      const clients = store.value!.clients;

      const idx = clients.findIndex((c) => c.identifier === payload.identifier);

      if (idx === -1) {
        clients.push(payload); // push new entry
      } else {
        // update in-place to preserve reactivity
        clients[idx] = payload;
      }
    },
  });

  return store.value;
};
