<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/20/solid"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"
import TaskDetailsDetails from "./TaskDetailsDetails.vue"

interface Props {
  task: Task
}

defineProps<Props>()

const contexts = ["details", "paths", "ffmpeg", "webhook", "none"] as const
type Context = (typeof contexts)[number]
const activeContext = useLocalStorage("detailContext", "none")
const displayContexts = computed(() => contexts.filter((c) => c !== "none"))
</script>
<template>
  <template v-for="context in displayContexts" :key="context">
    <div
      class="flex flex-col gap-y-8 w-full bg-gray-650 border border-gray-700 p-4 rounded-lg"
    >
      <div
        class="w-full flex justify-between items-center cursor-pointer"
        @click="
          activeContext === context
            ? (activeContext = 'none')
            : (activeContext = context)
        "
      >
        <span>{{ context }}</span>
        <ChevronRightIcon
          name="fa-solid fa-chevron-down"
          class="size-3 transition-transform duration-200"
          :class="{
            'rotate-90': context !== activeContext,
            '-rotate-90': context === activeContext,
          }"
        />
      </div>
      <TaskDetailsDetails
        v-if="context === 'details' && activeContext === 'details'"
        :task
      />
      <TaskDetailsPaths
        v-if="context === 'paths' && activeContext === 'paths'"
        :task
      />
    </div>
  </template>
</template>
