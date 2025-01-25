<script lang="ts" setup>
import type { RouteLocationNamedRaw, RouteLocationRaw } from "vue-router";
import type { AppTableNextColumnItemActionOptions } from "./AppTableNextCellAction.vue";

export interface Header {
  label?: string | number | boolean;
  id?: string;
  columnClass?: string;
  sortField?: string;
}
export interface Cell {
  label?: string | number | boolean;
  to?: (RouteLocationRaw | RouteLocationNamedRaw) & { external?: boolean };
  id?: string;

  rowUuid: string;
  rowIndex: number;
  columnIndex: number;

  raw: any;
}

export interface Column {
  cells: Cell[];
}

export interface Row {
  uuid: string;
  raw: any;
  cells: Omit<Cell, "rowUuid" | "rowIndex" | "columnIndex" | "raw">[];
}

export type SelectableType = ("checkbox" | "click" | "single")[];

interface Props {
  headers: Header[];
  rows: Row[];

  rowClass?: string;
  headersClass?: string;

  selectAble?: SelectableType;

  rowBlacklist?: string[];

  orientation?: "horizontal" | "vertical";
}
const props = defineProps<Props>();
const emit = defineEmits(["update:select", "update:sorting"]);

const hoveredRow = ref(-1);

watch(
  computed(() => props.rows),
  () => {
    selectedRows.value.forEach((u: string) => {
      if (!props.rows.find((r) => r.uuid === u)) {
        selectRow(u);
      }
    });
  }
);

const columns = computed((): Column[] => {
  if (!props.rows.length) return [];

  return props.rows.reduce((acc, row, index) => {
    row.cells.forEach((item, i) => {
      if (!acc[i]) {
        acc[i] = { cells: [] };
      }
      acc[i].cells.push({
        ...item,
        rowUuid: row.uuid,
        rowIndex: index,
        columnIndex: i,
        raw: row.raw,
      });
    });
    return acc;
  }, [] as Column[]);
});

const updateHoveredRow = (row: number) => {
  if (row !== -1 && props.rowBlacklist?.includes(props.rows[row].uuid)) {
    hoveredRow.value = -1;
  } else {
    hoveredRow.value = row;
  }
};

const selectedRows = ref<string[]>([]);
const selectRow = (item: string) => {
  if (!props.selectAble) return;
  if (props.rowBlacklist?.includes(item)) return;

  if (item === "all") {
    selectedRows.value =
      columns.value.find(() => true)?.cells.map((i) => i.rowUuid) ?? [];
  } else if (item === "none") {
    selectedRows.value = [];
  } else {
    if (selectedRows.value.includes(item)) {
      selectedRows.value = selectedRows.value.filter((i) => i !== item);
    } else {
      if (props.selectAble?.includes("single")) {
        selectedRows.value = [item];
      } else {
        selectedRows.value.push(item);
      }
    }
  }

  emit("update:select", selectedRows.value);
};

enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}
export interface Sorting {
  direction: SortDirection;
  fields?: string[];
}
const sorting = ref<Sorting | null>(null);
const updateSorting = (header: Header) => {
  if (sorting.value?.fields?.[0] !== header.sortField) {
    sorting.value = {
      direction: SortDirection.ASC,
      fields: header.sortField ? [header.sortField] : [],
    };
  } else if (sorting.value?.direction === SortDirection.DESC) {
    sorting.value = null;
  } else if (sorting.value?.fields?.[0] === header.sortField) {
    sorting.value = {
      direction:
        sorting.value?.direction === SortDirection.ASC
          ? SortDirection.DESC
          : SortDirection.ASC,
      fields: sorting.value?.fields,
    };
  }
  emit("update:sorting", sorting);
};
</script>

<template>
  <div class="flex size-full flex-col">
    <div
      v-if="!orientation || orientation === 'horizontal'"
      class="flex w-full flex-col text-sm"
    >
      <table border="0" cellspacing="0" cellpadding="0" class="appearance-none">
        <template v-for="(row, r) in rows">
          <AppTableNextRow
            :row="row"
            :rowIndex="r"
            :rowsTotal="rows.length"
            :headers="headers"
            :hoveredRow
            :rowClass
            :selectedRows
            :sorting
            :headersClass
            :selectAble
            @update:sorting="updateSorting"
            @update:hoveredRow="updateHoveredRow"
            @update:select="selectRow"
          >
            <template #header.label="res">
              <slot name="header.label" v-bind="res"></slot>
            </template>
            <template #cell.label="res">
              <slot name="cell.label" v-bind="res"></slot>
            </template>
            <template #row.before="res">
              <slot name="row.before" v-bind="{ ...res, hoveredRow }"></slot>
            </template>
            <template #row.after="res">
              <slot name="row.after" v-bind="res"></slot>
            </template>
          </AppTableNextRow>
        </template>
      </table>
    </div>

    <div
      v-else
      class="flex w-full flex-row items-start justify-between text-sm"
    >
      <!-- Column with a header and its items -->
      <template v-for="(header, i) in headers" :key="i">
        <AppTableNextColumn
          :columnIndex="i"
          :columnsTotal="headers.length"
          :header
          :column="columns[i]"
          :selectedRows
          :rowClass
          :headersClass
          :selectAble
          :sorting
          :hoveredRow
          @update:sorting="updateSorting"
          @update:hoveredRow="hoveredRow = $event"
          @update:select="selectRow"
        >
          <template #header.label="res">
            <slot name="header.label" v-bind="res"></slot>
          </template>
          <template #cell.label="res">
            <slot name="cell.label" v-bind="{ ...res, hoveredRow }"></slot>
          </template>
          <template #row.before="res">
            <slot name="row.before" v-bind="{ ...res, hoveredRow }"></slot>
          </template>
          <template #row.after="res">
            <slot name="row.after" v-bind="{ ...res, hoveredRow }"></slot>
          </template>
        </AppTableNextColumn>
      </template>
    </div>
  </div>
</template>
