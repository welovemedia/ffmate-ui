import { defineStore } from "pinia";

export interface Confirm {
  title: string;
  message: string;
  cancelCallback?: () => void;
  successCallback: () => void;
}

const originalStore = defineStore("confirm", {
  state: (): { confirm: Confirm | null } => {
    return { confirm: null };
  },
  actions: {
    set(confirm: Confirm) {
      this.confirm = {
        ...confirm,
        cancelCallback: () => {
          confirm.cancelCallback?.();
          this.clear();
        },
        successCallback: () => {
          confirm.successCallback();
          this.clear();
        },
      };
    },
    clear() {
      this.confirm = null;
    },
  },
});

const store = ref<ReturnType<typeof originalStore> | null>();

export const useConfirmStore = (): ReturnType<typeof originalStore> => {
  if (!store.value) {
    store.value = originalStore();
  }

  return store.value;
};
