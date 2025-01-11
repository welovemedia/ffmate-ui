<script lang="ts" setup>
import { ref } from "vue";
import type { Cell, SelectableType } from "./AppTableNext.vue";

interface Props {
  cell: Cell;

  rowClass?: string;

  rowIndex: number;
  rowsTotal: number;

  columnIndex: number;
  columnsTotal: number;

  hoveredRow: number;

  selectAble?: SelectableType;
  selectedRows?: string[];
}
defineProps<Props>();
const emit = defineEmits(["update:hoveredRow"]);

const resolvedNuxtLink = resolveComponent("NuxtLink");
</script>

<template>
  <component
    :is="cell.to ? resolvedNuxtLink : 'div'"
    :to="cell.to"
    :target="cell.to?.external ? '_blank' : '_self'"
    :external="cell.to?.external"
  >
    <div
      class="flex h-14 grow flex-row items-center space-x-2 p-4"
      :class="[
        rowClass,
        {
          ' bg-gray-800':
            hoveredRow === rowIndex || selectedRows?.includes(cell.rowUuid),
          'rounded-l-lg':
            columnIndex === 0 && !selectAble?.includes('checkbox'),
          'rounded-r-lg': columnIndex === columnsTotal - 1,
          'cursor-pointer': selectAble?.includes('click') || cell.to,
        },
      ]"
      @mouseenter="emit('update:hoveredRow', rowIndex)"
      @mouseleave="emit('update:hoveredRow', -1)"
    >
      <slot name="cell.label" v-bind="{ cell }">
        <div class="flex flex-row items-center space-x-2">
          <span class="line-clamp-1 break-all">{{ cell.label }}</span>
        </div>
      </slot>
    </div>
  </component>
</template>
