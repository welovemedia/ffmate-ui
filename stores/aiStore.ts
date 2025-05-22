import { defineStore } from "pinia"
import type { AI } from "~/sdk/ffmate/lib/interfaces/ai/openai"

const originalStore = defineStore("ai", {
  state: (): {
    ai: AI | null
  } => {
    return { ai: null }
  },
  getters: {
    vendor(): string | undefined {
      return this.ai?.vendor
    },
    model(): string | undefined {
      return this.ai?.model
    },
    key(): string | undefined {
      return this.ai?.key
    },
  },
  actions: {
    async load() {
      const ai = await useFFMate()
        .AI.getAI()
        .catch((e) => {
          useDebug("ai")("AI not configured")
        })
      if (ai) {
        this.ai = ai
      }
    },
  },
})

const store = ref<ReturnType<typeof originalStore> | null>()

export const useAiStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore()
    store.value.load()
  }
  
  return store.value
}
