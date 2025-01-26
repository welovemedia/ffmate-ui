<script lang="ts" setup>
import { ChevronRightIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { TrashIcon } from "@heroicons/vue/24/solid";
import type { Preset } from "~/sdk/ffmate/lib/interfaces/presets/preset";

const presetStore = usePresetStore();
const { perPage } = useConfig();
const page = ref(0);

watch(page, () => {
  presetStore.load(page.value, perPage);
});

const selectedItems = ref<string[]>([]);

const deletePreset = (preset: Preset) => {
  useConfirm({
    title: "Delete Preset",
    message: `Do you really want to delete the preset "${preset.name}"?`,
    successCallback: async () => {
      await presetStore.delete(preset.uuid);
    },
  });
};

const presets = computed(() => {
  return presetStore.presets;
});

const tableItems = computed(() => {
  return presets.value.map((t: Preset) => {
    const cells = [
      {
        label: t.name,
        id: "name",
      },
      {
        label: t.priority,
        id: "priority",
      },
      {
        label: t.command,
        id: "command",
      },
      {
        label: useMiddleTruncation(t.outputFile ?? "", 32),
        id: "outFile",
      },
      { label: t.preProcessing ? "Yes" : "No" },
      { label: t.postProcessing ? "Yes" : "No" },
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
      { label: 'Priority' },
      { label: 'Command' },
      { label: 'Outfile' },
      { label: 'PreProcessing', columnClass: 'w-64' },
      { label: 'PostProcessing', columnClass: 'w-64' },
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
        :total="presetStore.total"
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

      <span v-if="cell.id === 'priority'"
        ><span v-if="!cell.raw.isBatch">{{ cell.label }}</span></span
      >

      <span
        v-if="cell.id === 'status'"
        :class="{
          'text-blue-400':
            cell.label === 'RUNNING' ||
            cell.label === 'PRE_PROCESSING' ||
            cell.label === 'POST_PROCESSING',
          'text-primary-400': cell.label === 'DONE_SUCCESSFUL',
          'text-red-400': cell.label === 'DONE_ERROR',
          'text-yellow-400': cell.label === 'DONE_CANCELED',
        }"
        >{{ cell.label }}</span
      >

      <div
        v-if="cell.id === 'progress'"
        class="bg-white rounded-xl shadow-sm overflow-hidden p-1 w-40"
      >
        <div class="relative h-4 flex items-center justify-center">
          <div
            class="absolute top-0 bottom-0 left-0 rounded-lg transition-all duration-300 ease-in-out"
            :class="{
              'bg-blue-500':
                cell.raw.status === 'RUNNING' ||
                cell.raw.stats === 'PRE_PROCESSING' ||
                cell.raw.status === 'POST_PROCESSING',
              'bg-green-400': cell.raw.status === 'DONE_SUCCESSFUL',
              'bg-red-400': cell.raw.status === 'DONE_ERROR',
              'bg-yellow-400': cell.raw.status === 'DONE_CANCELED',
            }"
            :style="`width:${cell.raw.progress}%`"
          ></div>
          <div class="relative text-gray-900 font-medium text-sm">
            {{ cell.label }}
          </div>
        </div>
      </div>

      <div
        v-if="cell.id === 'chevron' && !cell.raw.isBatch"
        class="flex flex-row space-x-2 justify-end w-full"
      >
        <template v-if="cell.rowIndex === hoveredRow">
          <TrashIcon
            class="size-3 hover:text-gray-300 text-gray-400 z-50"
            @click.stop="deletePreset(cell.raw)"
          />
        </template>
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
          class="px-12 shadow-sm shadow-gray-900 mb-2 bg-gray-900 -mt-2 rounded-b-lg w-[99%] mx-auto"
        >
          <PresetDetails :preset="row.raw" />
        </div>
      </div>
    </template>
  </AppTableNext>
</template>
