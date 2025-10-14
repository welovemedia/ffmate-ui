<script lang="ts" setup>
import { InformationCircleIcon, TrashIcon } from "@heroicons/vue/24/outline"
import { ArrowPathIcon } from "@heroicons/vue/24/solid"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"

useSetCurrentPage().setCurrent(PageTitles.Dashboard)

const taskStore = useTaskStore()
const clientStore = useClientStore()

const { perPage } = useConfig()
const page = ref(0)

watch(page, () => {
  window.scrollTo({ top: 0, behavior: "smooth" })
  taskStore.load(page.value, perPage)
})

const activeFilter = ref<string>("ALL")
watch(activeFilter, async () => {
  page.value = 0
  await taskStore.load(
    page.value,
    perPage,
    activeFilter.value === "ALL" ? undefined : activeFilter.value
  )
  window.scrollTo({ top: 0, behavior: "smooth" })
})

const processBatches = ref<string[]>([])

const tasks = computed(() => {
  const tasks = taskStore.tasks
  const result = [] as Task[]
  processBatches.value = []

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i]!
    const batch = task.batch
    if (batch && !processBatches.value.includes(batch)) {
      result.push({
        batch: task.batch!,
        uuid: task.batch,
        status: "",
        command: { raw: "" },
        priority: 0,
        isBatch: true,
        name: "Batch",
        source: "api",
        inputFile: { raw: "" },
        outputFile: { raw: "" },
        createdAt: task.createdAt,
        retries: 0,
        retried: 0,
        updatedAt: task.updatedAt,
        remaining: -1,
        lastRemaining: -1,
        progress:
          Math.round(
            (tasks
              .filter((t) => t.batch === task.batch)
              .reduce((sum, t) => sum + (t.progress || 0), 0) /
              tasks.filter((t) => t.batch === task.batch).length) *
              100
          ) / 100,
      } as Task)
      processBatches.value.push(batch)
    }
    result.push(task)
  }

  return result
})

const taskStats = ref<Task>()
onMounted(() => {
  setTimeout(() => {
    taskStats.value = taskStore.tasks[0]!
  }, 1000)
})
const showStats = (task: Task) => {
  taskStats.value = task
}

const form = reactive({
  status: "ALL",
  client: clientStore.clients[0]?.identifier ?? "",
})
</script>

<template>
  <div class="px-2">
    <div class="flex flex-col gap-y-2">
      <Card>
        <div class="size-full flex items-center justify-between">
          <div class="flex items-center gap-x-4">
            <FormFieldSelect
              v-model="activeFilter"
              :options="[
                { key: 'ALL', label: 'All' },
                { key: 'QUEUED', label: 'Queued' },
                { key: 'RUNNING', label: 'Running' },
                { key: 'DONE_SUCCESSFUL', label: 'Successful' },
                { key: 'DONE_ERROR', label: 'Error' },
                { key: 'DONE_CANCELED', label: 'Canceled' },
              ]"
            />
            <FormFieldSelect
              v-model="form.client"
              :options="
                clientStore.clients.map((c) => ({
                  key: c.identifier,
                  label: c.identifier,
                }))
              "
            />
          </div>
          <div class="flex items-center gap-x-2">
            <Button type="cancel" class="flex items-center gap-x-2"
              ><TrashIcon class="size-4" /> Clear tasks</Button
            >
          </div>
        </div>
      </Card>

      <EmptyState v-if="taskStore.loaded && !tasks.length">
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
                @click="activeFilter = 'ALL'"
                >reset</span
              >
              the filter</template
            ></span
          >
        </template>
      </EmptyState>

      <Card
        v-for="task in taskStore.tasks"
        :key="task.uuid"
        class="hover:scale-101 origin-center transition-transform duration-300"
      >
        <div class="flex items-center justify-between gap-x-2 group h-24">
          <TaskInfo :task />
          <div
            class="opacity-0 group-hover:opacity-100 transition-opacity duration-100 w-50 flex justify-end gap-x-4"
          >
            <ArrowPathIcon
              class="size-4 text-primary-300 opacity-75 hover:opacity-100 cursor-pointer"
              @click="taskStore.restart(task.uuid)"
            />
            <InformationCircleIcon
              class="size-4 text-blue-300 opacity-75 hover:opacity-100 cursor-pointer"
              @click="showStats(task)"
            />
            <!-- <SparklesIcon
                            class="size-4 text-pink-300 opacity-75 hover:opacity-100 cursor-pointer"
                        /> -->
            <TrashIcon
              class="size-4 text-red-300 opacity-75 hover:opacity-100 cursor-pointer"
              @click="taskStore.delete(task.uuid)"
            />
          </div>
        </div>
      </Card>
    </div>
  </div>
  <Modal :open="taskStats !== undefined" @close="taskStats = undefined">
    <TaskDetail :task="taskStats!" @close="taskStats = undefined" />
  </Modal>
</template>
