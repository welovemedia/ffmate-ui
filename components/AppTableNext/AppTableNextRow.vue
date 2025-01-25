<script lang="ts" setup>
import type { Header, Row, SelectableType, Sorting } from "./AppTableNext.vue";
import AppTableNextCheckbox from "./AppTableNextCheckbox.vue";

interface Props {
  headers: Header[];
  row: Row;
  rowIndex: number;
  rowsTotal: number;

  headersClass?: string;
  rowClass?: string;

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
    props.selectedRows.length === props.rowsTotal
    ? true
    : false;
});
const isIndeterminate = computed(() => {
  return props.selectedRows.length &&
    props.selectedRows.length !== props.rowsTotal
    ? true
    : false;
});
</script>

<template>
  <!-- header row -->
  <template v-if="rowIndex === 0">
    <!-- checkbox -->
    <tr>
      <td
        v-if="
          selectAble?.includes('checkbox') && !selectAble?.includes('single')
        "
        class="w-8 border-b border-gray-600 px-6"
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
      </td>
      <template v-for="(header, h) in headers">
        <td :class="header.columnClass">
          <AppTableNextRowHeader
            :header
            :sorting
            :headersClass
            @update:sorting="emit('update:sorting', header)"
          >
            <template #header.label="res"
              ><slot name="header.label" v-bind="res"></slot>
            </template>
          </AppTableNextRowHeader>
        </td>
      </template>
    </tr>
    <!-- headers spacer -->
    <tr class="h-1">
      <td
        :colspan="headers.length + (selectAble?.includes('checkbox') ? 1 : 0)"
      ></td>
    </tr>
  </template>

  <!-- item row prependix -->
  <tr v-if="$slots['row.before']">
    <td v-if="selectAble?.includes('checkbox')"></td>
    <td class="" :colspan="headers.length">
      <slot name="row.before" v-bind="{ row, rowIndex }"></slot>
    </td>
  </tr>

  <!-- item rows -->
  <tr
    v-if="row.cells.length"
    @mouseenter="emit('update:hoveredRow', rowIndex)"
    @mouseleave="emit('update:hoveredRow', -1)"
  >
    <!-- item rows checkboy -->
    <td
      v-if="selectAble?.includes('checkbox') && !selectAble?.includes('single')"
      class="rounded-l-lg px-6"
      :class="[
        rowClass,
        {
          'bg-gray-800':
            hoveredRow === rowIndex || selectedRows?.includes(row.uuid),
        },
      ]"
    >
      <AppTableNextCheckbox
        :selected="selectedRows?.includes(row.uuid)"
        @update:select="emit('update:select', row.uuid)"
      />
    </td>

    <!-- item row cells (item) -->
    <template v-for="(cell, c) in row.cells">
      <td>
        <AppTableNextRowCell
          :cell="{
            ...cell,
            rowIndex,
            columnIndex: c,
            rowUuid: row.uuid,
            raw: row.raw,
          }"
          :rowIndex="rowIndex"
          :rowsTotal="rowsTotal"
          :columnIndex="c"
          :rowClass
          :columnsTotal="row.cells.length"
          :hoveredRow
          :selectedRows
          :selectAble
          @click="
                        (e: MouseEvent) => {
                            if (selectAble?.includes('click')) {
                                e.preventDefault();
                                emit('update:select', row.uuid);
                            }
                        }
                    "
          @update:hoveredRow="emit('update:hoveredRow', $event)"
        >
          <template #cell.label="res">
            <slot name="cell.label" v-bind="res" :hoveredRow :selectedRows>
            </slot>
          </template>
        </AppTableNextRowCell>
      </td>
    </template>
  </tr>

  <!-- item row appendix -->
  <tr v-if="$slots['row.after']">
    <td v-if="selectAble?.includes('checkbox')"></td>
    <td class="" :colspan="headers.length">
      <slot name="row.after" v-bind="{ row }"></slot>
    </td>
  </tr>
</template>

<style scoped>
.table-cell {
  vertical-align: middle;
}
</style>
