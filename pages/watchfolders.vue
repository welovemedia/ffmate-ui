<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
import { TrashIcon } from "@heroicons/vue/24/solid";
import { StopIcon } from "@heroicons/vue/24/solid";
import type { WatchArrayCallback } from "@vueuse/core";
import type { Preset } from "~/sdk/ffmate/lib/interfaces/presets/preset";
import type { Watchfolder } from "~/sdk/ffmate/lib/interfaces/watchfolders/watchfolder";

const watchfolderStore = useWatchfolderStore();
const presetStore = usePresetStore();
const { perPage } = useConfig();
const page = ref(0);

watch(page, () => {
  watchfolderStore.load(page.value, perPage);
});

const selectedItems = ref<string[]>([]);

const deletePreset = (preset: Preset) => {};

const presets = computed(() => {
  return watchfolderStore.watchfolders;
});

const tableItems = computed(() => {
  return presets.value.map((t: Watchfolder) => {
    const cells = [
      {
        label: t.name,
        id: "name",
      },
      {
        label: t.interval + ` (checks: ${t.growthChecks})`,
        id: "interval",
      },
      {
        label: useMiddleTruncation(t.path ?? "", 32),
        id: "path",
      },
      {
        label: presetStore.presets.find((p) => p.uuid === t.preset)?.name,
        id: "preset",
      },
      {
        label: t.filter?.extensions ? "Yes" : "No",
        id: "preset",
      },
      {
        label: "yo",
        id: "lastCheck",
      },
      { id: "chevron" },
    ];

    return {
      raw: t,
      uuid: t.uuid,
      cells: cells,
    };
  });
});
</script>

<template>
  <AppTableNext
    :headers="[
      { label: 'Name' },
      { label: 'Interval (sec)' },
      { label: 'Path' },
      { label: 'Preset' },
      { label: 'Filter' },
      { label: 'LastCheck' },
      { label: 'pagination', columnClass: 'w-16' },
    ]"
    :rows="tableItems"
    :selectAble="['click', 'single']"
    @update:select="selectedItems = $event"
  >
    <template #header.label="{ header }">
      <Pagination
        v-if="header.label === 'pagination'"
        :page="page"
        :perPage="perPage"
        :total="watchfolderStore.total"
        @next="page++"
        @previous="page--"
      />
    </template>
    <template #cell.label="{ cell, hoveredRow }">
      <div
        v-if="cell.id === 'name'"
        class="flex flex-col items-center"
        :class="{ 'pl-4': !cell.raw.isBatch && cell.raw.batch }"
      >
        <div class="flex flex-col">
          <span :class="{ 'italic text-gray-400': !cell.label }">{{
            (cell.label as string)?.length
              ? useMiddleTruncation((cell.label as string) ?? "", 64)
              : "no name found"
          }}</span>
          <span class="text-xs text-gray-400"
            >{{
              cell.raw.finishedAt
                ? "finished"
                : cell.raw.startedAt
                ? "started"
                : "created"
            }}
            {{
              useTimeAgo(
                new Date(
                  cell.raw.finishedAt ??
                    cell.raw.startedAt ??
                    cell.raw.createdAt
                )
              )
            }}
          </span>
        </div>
      </div>

      <div
        v-if="cell.id === 'chevron' && !cell.raw.isBatch"
        class="flex flex-row space-x-2 justify-end w-full"
      >
        <ChevronRightIcon
          class="size-3 transition-all"
          :class="{
            'rotate-90': selectedItems.includes(cell.rowUuid),
          }"
        />
      </div>
    </template>
    <template #row.after="{ row }">
      <div
        class="h-0 overflow-hidden transition-all"
        :class="{ 'h-auto': selectedItems.includes(row.uuid) }"
      >
        <div
          class="px-12 border border-gray-900 bg-gray-800/50 -mt-2 rounded-b-lg w-[99%] mx-auto"
        >
          <WatchfolderDetails :watchfolder="row.raw" />
        </div>
      </div>
    </template>
  </AppTableNext>
</template>
