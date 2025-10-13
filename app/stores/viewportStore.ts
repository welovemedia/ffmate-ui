import { defineStore } from "pinia";

const originalStore = defineStore("viewport", {
  state: (): { sidebar: { expand: boolean } } => {
    return { sidebar: { expand: true } };
  },
  actions: {},
  persist: {
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
