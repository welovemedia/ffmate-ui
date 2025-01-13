<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/24/solid"
import { useMiddleTruncation } from "~/comspoables/useMiddleTruncation"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"

const taskStore = useTaskStore()
onMounted(() => {
  taskStore.load()
})

const selectedItems = ref<string[]>([])

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
        priority: 0,
        isBatch: true,
        name: "Batch",
        inputFile: "",
        outputFile: "",
        createdAt: tasks[i].createdAt,
        updatedAt: tasks[i].updatedAt,
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
        label: useMiddleTruncation(t.inputFile, 32),
        id: "inputFile",
      },
      {
        label: useMiddleTruncation(t.outputFile, 32),
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
  <AppTableNext
    :headers="[
      { label: 'Name' },
      { label: 'Priority' },
      { label: 'Status' },
      { label: 'Progress' },
      { label: 'Input', columnClass: 'w-64' },
      { label: 'Output', columnClass: 'w-64' },
      { columnClass: 'w-8' },
    ]"
    :rows="tableItems"
    :selectAble="['click', 'single']"
    :rowBlacklist="processBatches"
    @update:select="selectedItems = $event"
  >
    <template #cell.label="{ cell }">
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
          <span class="text-xs text-gray-400">{{ cell.raw.uuid }}</span>
        </div>
      </div>

      <span v-if="cell.id === 'priority'"
        ><span v-if="!cell.raw.isBatch">{{ cell.label }}</span></span
      >

      <span
        v-if="cell.id === 'status'"
        :class="{
          'text-yellow-400':
            cell.label === 'RUNNING' || cell.label === 'POST_PROCESSING',
          'text-primary-400': cell.label === 'DONE_SUCCESSFUL',
          'text-red-400':
            cell.label === 'DONE_CANCELED' || cell.label === 'DONE_ERROR',
        }"
        >{{ cell.label }}</span
      >

      <div
        v-if="cell.id === 'progress'"
        class="bg-white rounded-xl shadow-sm overflow-hidden p-1 w-40"
      >
        <div class="relative h-4 flex items-center justify-center">
          <div
            class="absolute top-0 bottom-0 left-0 rounded-lg bg-primary-400 transition-all duration-300 ease-in-out"
            :style="`width:${cell.raw.progress}%`"
          ></div>
          <div class="relative text-primary-900 font-medium text-sm">
            {{ cell.label }}
          </div>
        </div>
      </div>

      <ChevronRightIcon
        v-if="cell.id === 'chevron' && !cell.raw.isBatch"
        class="size-3 transition-all"
        :class="{ 'rotate-90': selectedItems.includes(cell.rowUuid) }"
      />
    </template>
    <template #row.after="{ row }">
      <div
        class="h-0 overflow-hidden transition-all"
        :class="{ 'h-auto': selectedItems.includes(row.uuid) }"
      >
        <div
          class="px-12 border border-gray-900 bg-gray-800/50 -mt-2 rounded-b-lg w-[99%] mx-auto"
        >
          <TaskDetails :task="row.raw" />
        </div>
      </div>
    </template>
  </AppTableNext>
</template>
