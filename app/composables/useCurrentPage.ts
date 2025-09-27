const _current = ref<string | undefined>(undefined);

export const useCurrentPage = () => {
  const setCurrent = (cur?: string) => {
    _current.value = cur;
    return _current.value;
  };

  return { current: _current.value, setCurrent };
};
