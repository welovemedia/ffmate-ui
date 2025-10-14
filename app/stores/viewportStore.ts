import { defineStore } from "pinia";

const originalStore = defineStore("viewport", {
  state: (): {
    sidebar: { expand: boolean };
    logs: { open: boolean };
  } => {
    return {
      sidebar: { expand: true },
      logs: { open: false },
    };
  },
  actions: {},
  persist: {
    pick: ["sidebar", "logs"],
    storage: localStorage,
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const useViewportStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore();
  }
  return store.value;
};
