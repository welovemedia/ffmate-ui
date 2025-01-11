<script lang="ts" setup>
import type { Cell } from "./AppTableNext.vue"

export type AppTableNextColumnCellActionCallback = (item: Cell) => void;

export type AppTableNextColumnItemActionOptions = {
  icon: string;
  ariaLabel: string;
  callback: AppTableNextColumnCellActionCallback;
  if?: globalThis.Ref<boolean>;
};

interface Props {
  action: AppTableNextColumnItemActionOptions;
  visible?: boolean;
}

defineProps<Props>();
</script>

<template>
  <button
    class="group/icons h-6 w-6 rounded-md border border-gray-600 bg-gray-750 text-center hover:border-gray-500"
    :class="{
      'opacity-0 group-hover:opacity-100': !visible,
    }"
    :aria-label="action.ariaLabel"
  >
    <ficon
      :icon="action.icon"
      class="cursor-pointer text-xs text-gray-400 group-hover/icons:text-gray-300"
    />
  </button>
</template>
