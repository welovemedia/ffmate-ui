<script lang="ts" setup>
import { FolderIcon, InboxIcon } from "@heroicons/vue/24/outline"
import {
  ArrowPathIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  StopCircleIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"

const taskStore = useTaskStore()
const { perPage } = useConfig()
const page = ref(0)

watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  taskStore.load(page.value, perPage)
})

const selectedItems = ref<string[]>([])

const showFilter = ref(false)
const activeFilter = ref<string | undefined>(undefined)
watch(activeFilter, async () => {
  page.value = 0
  await taskStore.load(page.value, perPage, activeFilter.value)
  window.scrollTo({ top: 0, behavior: "smooth" })
})

const processBatches = ref<string[]>([])

const tasks = computed(() => {
  const tasks = taskStore.tasks
  const result = [] as Task[]

  processBatches.value = []

  for (let i = 0; i < tasks.length; i++) {
    const batch = tasks[i].batch
    if (batch && !processBatches.value.includes(batch)) {
      result.push({
        batch: tasks[i].batch!,
        uuid: tasks[i].batch,
        status: "",
        command: { raw: "" },
        priority: 0,
        isBatch: true,
        name: "Batch",
        source: "api",
        inputFile: { raw: "" },
        outputFile: { raw: "" },
        createdAt: tasks[i].createdAt,
        updatedAt: tasks[i].updatedAt,
        remaining: -1,
        lastRemaining: -1,
        progress:
          Math.round(
            (tasks
              .filter((t) => t.batch === tasks[i].batch)
              .reduce((sum, t) => sum + (t.progress || 0), 0) /
              tasks.filter((t) => t.batch === tasks[i].batch).length) *
              100
          ) / 100,
      } as Task)
      processBatches.value.push(batch)
    }
    result.push(tasks[i])
  }

  return result
})

const tableItems = computed(() => {
  return tasks.value.map((t: Task) => {
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
        label: t.status,
        id: "status",
      },
      {
        label: t.progress + "%",
        id: "progress",
      },
      {
        label: useMiddleTruncation(t.inputFile.raw, 32),
        id: "inputFile",
      },
      {
        label: useMiddleTruncation(t.outputFile.raw, 32),
        id: "outputFile",
      },
      { id: "chevron" },
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
  <div>
    <EmptyState v-if="taskStore.loaded && !tableItems.length">
      <template #title>
        <span class="text-3xl">No tasks found</span>
      </template>
      <template #message>
        <span class="text-xl mt-8"
          >Create a task
          <template v-if="activeFilter"
            >or
            <span
              class="text-primary-400 hover:text-primary-300 cursor-pointer"
              @click="activeFilter = undefined"
              >reset</span
            >
            the filter</template
          ></span
        >
      </template>
    </EmptyState>
    <AppTableNext
      v-else-if="taskStore.loaded && tableItems.length"
      :headers="[
        { label: 'Name' },
        { label: 'Priority' },
        { label: 'Status' },
        { label: 'Progress' },
        { label: 'Input', columnClass: 'w-64' },
        { label: 'Output', columnClass: 'w-64' },
        { label: 'pagination', columnClass: 'w-16' },
      ]"
      :rows="tableItems"
      :selectAble="['click', 'single']"
      :rowBlacklist="processBatches"
      @update:select="selectedItems = $event"
    >
      <template #header.label="{ header }">
        <div
          v-if="header.label === 'Status' && !showFilter"
          class="flex flex-row space-x-2 items-center"
        >
          <span>Status</span>
          <Cog6ToothIcon
            class="size-3 cursor-pointer mt-[2px] text-gray-400 hover:text-gray-300"
            @click="showFilter = true"
          />
        </div>
        <div
          v-if="header.label === 'Status' && showFilter"
          class="flex flex-row space-x-2 items-center"
        >
          <select
            class="h-6 bg-black py-0 my-0 text-xs rounded-lg"
            @change="(event: any) => {
            activeFilter = event.target.value === 'ALL' ? undefined : event.target.value
            showFilter = false
          }"
          >
            <option :selected="!activeFilter">ALL</option>
            <option :selected="activeFilter === 'QUEUED'">QUEUED</option>
            <option :selected="activeFilter === 'RUNNING'">RUNNING</option>
            <option :selected="activeFilter === 'DONE_SUCCESSFUL'">
              DONE_SUCCESSFUL
            </option>
            <option :selected="activeFilter === 'DONE_ERROR'">
              DONE_ERROR
            </option>
            <option :selected="activeFilter === 'DONE_CANCELED'">
              DONE_CANCELED
            </option>
          </select>
        </div>
        <Pagination
          v-if="header.label === 'pagination'"
          :page="page"
          :perPage="perPage"
          :total="taskStore.total"
          @next="page++"
          @previous="page--"
        />
      </template>
      <template #cell.label="{ cell, hoveredRow }">
        <div
          v-if="cell.id === 'name'"
          :id="`row-${cell.raw.uuid}`"
          class="flex flex-col items-center"
          :class="{ 'pl-4': !cell.raw.isBatch && cell.raw.batch }"
        >
          <div class="flex flex-col">
            <div class="flex flex-row space-x-2 items-center">
              <FolderIcon
                v-if="cell.raw.source === 'watchfolder'"
                class="size-3"
              />
              <InboxIcon v-else class="size-3" />
              <span :class="{ 'italic text-gray-400': !cell.label }">{{
                (cell.label as string)?.length
                  ? useMiddleTruncation((cell.label as string) ?? "", 64)
                  : "no name found"
              }}</span>
            </div>
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
                    showSecond: false,
                  }
                )
              }}
            </span>
          </div>
        </div>

        <span v-if="cell.id === 'priority'"
          ><span v-if="!cell.raw.isBatch">{{ cell.label }}</span></span
        >

        <div v-if="cell.id === 'status'">
          <span
            :class="{
              'text-blue-400':
                cell.label === 'RUNNING' ||
                cell.label === 'PRE_PROCESSING' ||
                cell.label === 'POST_PROCESSING',
              'text-green-400': cell.label === 'DONE_SUCCESSFUL',
              'text-red-400': cell.label === 'DONE_ERROR',
              'text-yellow-400': cell.label === 'DONE_CANCELED',
            }"
            >{{ cell.label }}
            <span
              v-if="
                cell.raw.status === 'RUNNING' &&
                cell.raw.lastRemaining &&
                cell.raw.lastRemaining > 0
              "
              class="text-xs text-gray-300"
              ><br />~
              {{
                useTimeAgo(Date.now() + cell.raw.lastRemaining * 1000, {
                  showSecond: true,
                }).value.replaceAll("in ", "")
              }}
              remaining</span
            ></span
          >
        </div>

        <div v-if="cell.id === 'progress'" class="flex flex-col items-end">
          <div class="bg-white rounded-xl shadow-sm overflow-hidden p-1 w-40">
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
        </div>

        <div
          v-if="cell.id === 'chevron' && !cell.raw.isBatch"
          class="flex flex-row space-x-2 justify-end w-full"
        >
          <template v-if="cell.rowIndex === hoveredRow">
            <div
              v-if="cell.raw.status.indexOf('DONE_') !== -1"
              class="p-2 group h-full"
              @click.stop="taskStore.restart(cell.raw.uuid)"
            >
              <ArrowPathIcon
                class="size-3 group-hover:text-gray-300 text-gray-400"
              />
            </div>
            <div
              v-if="cell.raw.status === 'RUNNING'"
              class="p-2 group"
              @click.stop="taskStore.cancel(cell.raw.uuid)"
            >
              <StopCircleIcon
                class="size-3 group-hover:text-gray-300 text-gray-400"
              />
            </div>
            <div
              v-if="
                cell.raw.status.indexOf('DONE_') !== -1 ||
                cell.raw.status === 'QUEUED'
              "
              class="p-2 group"
              @click.stop="taskStore.delete(cell.raw.uuid)"
            >
              <TrashIcon
                class="size-3 group-hover:text-gray-300 text-gray-400"
              />
            </div>
          </template>
          <div class="p-2">
            <ChevronRightIcon
              class="size-3 transition-all"
              :class="{
                'rotate-90': selectedItems.includes(cell.rowUuid),
              }"
            />
          </div>
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
            <TaskDetails :task="row.raw" />
          </div>
        </div>
      </template>
    </AppTableNext>
  </div>
</template>
