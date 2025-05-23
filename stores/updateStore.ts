import axios from "axios"
import { defineStore } from "pinia"

interface Update {
  Version: string
  Sha256: string
}

const originalStore = defineStore("update", {
  state: (): {
    installedVersion: string | undefined
    newVersion: string | undefined
  } => {
    return { newVersion: undefined, installedVersion: undefined }
  },
  getters: {
    isUpdateAvailable: (state) => {
      if (!state.newVersion || !state.installedVersion) {
        return false
      }
      return state.newVersion !== state.installedVersion
    },
  },
  actions: {
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

export const useUpdateStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore()

    useIntervalFn(() => {
      store.value!.useCheckForUpdates()
    }, 1000 * 60 * 60) // every hour

    store.value!.useCheckForUpdates()
  }

  return store.value
}
