<script lang="ts" setup>
import {
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid"
import type { Watchfolder } from "~/sdk/ffmate/lib/interfaces/watchfolders/watchfolder"

const watchfolderStore = useWatchfolderStore()
const presetStore = usePresetStore()
const { perPage } = useConfig()
const page = ref(0)

useCurrentPage().setCurrent("Watchfolder")

watch(page, () => {
  watchfolderStore.load(page.value, perPage)
})

const selectedItems = ref<string[]>([])

const editWatchfolder = (watchfolder: Watchfolder) => {
  useRouter().push({
    name: "watchfolders-new",
    query: { edit: watchfolder.uuid },
  })
}

const deleteWatchfolder = (watchfolder: Watchfolder) => {
  useConfirm({
    title: "Delete Watchfolder",
    message: `Do you really want to delete the watchfolder "${watchfolder.name}"?`,
    successCallback: async () => {
      await watchfolderStore.delete(watchfolder.uuid)
    },
  })
}

const watchfolders = computed(() => {
  return watchfolderStore.watchfolders
})

const tableItems = computed(() => {
  return watchfolders.value.map((t: Watchfolder) => {
    const cells = [
      {
        label: t.name,
        id: "name",
      },
      {
        label: "",
        id: "status",
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
        label: useTimeAgo(new Date(t.lastCheck)).value,
        id: "lastCheck",
      },
      { label: "", id: "chevron" },
    ]

    return {
      raw: t,
      uuid: t.uuid,
      cells: cells,
    }
  })
})
</script>

<template>
  <AppTableNext
    :headers="[
      { label: 'Name' },
      { label: 'Status' },
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
      <span
        v-if="cell.id === 'status'"
        :class="{
          '!text-yellow-500': cell.raw.suspended,
          'text-red-500': cell.raw.error && !cell.raw.suspended,
          'text-green-500': !cell.raw.error && !cell.raw.suspended,
        }"
      >
        {{ cell.raw.suspended ? "PAUSED" : cell.raw.error ?? "OK" }}
      </span>
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
                ),
                {
                  showSecond: true,
                  updateInterval: 1,
                }
              )
            }}
          </span>
        </div>
      </div>

      <div
        v-if="cell.id === 'chevron'"
        class="flex flex-row space-x-2 justify-end w-full"
      >
        <template v-if="cell.rowIndex === hoveredRow">
          <PencilIcon
            class="size-3 hover:text-gray-300 text-gray-400 z-50"
            @click.stop="editWatchfolder(cell.raw)"
          />
          <TrashIcon
            class="size-3 hover:text-gray-300 text-gray-400 z-50"
            @click.stop="deleteWatchfolder(cell.raw)"
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
          class="px-12 mb-2 bg-white/10 backdrop-blur-3xl -mt-2 rounded-b-lg w-[99%] mx-auto"
        >
          <WatchfolderDetails :watchfolder="row.raw" />
        </div>
      </div>
    </template>
  </AppTableNext>
</template>
