import axios from "axios"
import { defineStore } from "pinia"
import type { Client } from "~/sdk/ffmate/lib/interfaces/client/client"

interface Update {
  Version: string
  Sha256: string
}

const originalStore = defineStore("client", {
  state: (): {
    client: Client | undefined
    newVersion: string | undefined
  } => {
    return { client: undefined, newVersion: undefined }
  },
  getters: {
    isUpdateAvailable: (state) => {
      if (!state.newVersion || !state.client?.version) {
        return false
      }
      return state.newVersion !== state.client?.version
    },
    isFfmpegFound: (state) => {
      return state.client?.ffmpeg.length !== 0
    },
  },
  actions: {
    async loadClient() {
      const c = await useFFMate().Client.getClient()
      if (c) {
        this.client = c
      }
    },
    async useCheckForUpdates() {
      const version = (
        await axios.get<Update>(
          "https://earth.ffmate.io/_update/ffmate/darwin-arm64.json"
        )
      )?.data?.Version
      if (version) {
        this.newVersion = `ffmate/v${version}`
      }
    },
  },
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useClientStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore()

    store.value.loadClient()

    useIntervalFn(() => {
      store.value!.useCheckForUpdates()
    }, 1000 * 60 * 60) // every hour

    store.value!.useCheckForUpdates()
  }

  return store.value
}
