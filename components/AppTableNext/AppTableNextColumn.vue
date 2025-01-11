<script lang="ts" setup>
import type {
  Column,
  Header,
  SelectableType,
  Sorting,
} from "./AppTableNext.vue";

interface Props {
  columnIndex: number;
  columnsTotal: number;

  header: Header;

  column?: Column;

  rowClass?: string;
  headersClass?: string;

  selectAble?: SelectableType;
  selectedRows: string[];

  sorting: Sorting | null;

  hoveredRow: number;
}
const props = defineProps<Props>();
const emit = defineEmits([
  "update:hoveredRow",
  "update:select",
  "update:sorting",
]);

const isAllSelected = computed(() => {
  return props.selectedRows.length &&
    props.selectedRows.length === props.column?.cells.length
    ? true
    : false;
});
const isIndeterminate = computed(() => {
  return props.selectedRows.length &&
    props.selectedRows.length !== props.column?.cells.length
    ? true
    : false;
});
</script>

<template>
  <!-- checkbox if selectAble.includes('checkbox') -->
  <div
    v-if="columnIndex === 0 && selectAble?.includes('checkbox')"
    class="flex flex-col items-center space-y-1"
  >
    <div
      class="h-12 w-full border-b border-gray-600 p-4 text-gray-400"
      :class="[headersClass]"
    >
      <AppTableNextCheckbox
        v-if="!selectAble.includes('single')"
        :selected="selectedRows.length ? true : false"
        :indeterminate="isIndeterminate"
        @update:select="
          emit(
            'update:select',
            isIndeterminate ? 'none' : isAllSelected ? 'none' : 'all'
          )
        "
      />
    </div>
    <div
      v-for="(cell, x) in column?.cells"
      :key="`select-${cell.rowIndex}-${x}`"
      class="flex h-14 flex-row items-center space-x-2 p-4"
      :class="[
        rowClass,
        {
          'bg-gray-800 ':
            hoveredRow === x || selectedRows?.includes(cell.rowUuid),
          'rounded-l-lg': columnIndex === 0,
          'rounded-r-lg': columnIndex === columnIndex - 1,
          'cursor-pointer': selectAble,
        },
      ]"
      @mouseenter="emit('update:hoveredRow', x)"
      @mouseleave="emit('update:hoveredRow', -1)"
    >
      <AppTableNextCheckbox
        :selected="selectedRows?.includes(cell.rowUuid)"
        @update:select="emit('update:select', cell.rowUuid)"
      />
    </div>
  </div>

  <!-- header with its cells -->
  <div class="flex grow flex-col space-y-1" :class="[header.columnClass]">
    <!-- header -->
    <AppTableNextColumnHeader
      :header
      :sorting
      :headersClass
      @update:sorting="emit('update:sorting', header)"
    >
      <template #header.label> </template>
    </AppTableNextColumnHeader>

    <!-- items-->
    <template v-for="(cell, x) in column?.cells" :key="x">
      <AppTableNextColumnCell
        :cell="cell"
        :rowIndex="x"
        :rowsTotal="column?.cells.length ?? 0"
        :columnIndex
        :rowClass
        :columnsTotal
        :hoveredRow
        :selectedRows
        :selectAble
        @click.prevent="
          () => {
            selectAble?.includes('click') &&
              emit('update:select', cell.rowUuid);
          }
        "
        @update:hoveredRow="emit('update:hoveredRow', $event)"
      >
        <template #cell.label="res">
          <slot name="cell.label" v-bind="res" :hoveredRow :selectedRows>
          </slot>
        </template>
      </AppTableNextColumnCell>
    </template>
  </div>

  <!-- additional content div -->
</template>
