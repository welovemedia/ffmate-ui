export const useConfirm = (confirm: Confirm) => {
  const confirmStore = useConfirmStore();
  confirmStore.set(confirm);
};
