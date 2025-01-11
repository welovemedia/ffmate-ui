<script lang="ts" setup>
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task";

interface Props {
  task: Task;
}

defineProps<Props>();
</script>

<template>
  <div class="pt-12">
    <div class="px-4 sm:px-0">
      <h3 class="text-base/7 font-semibold text-white">
        {{ task.name }}
      </h3>
      <p class="max-w-2xl text-sm/6 text-gray-400">
        {{ task.uuid }}
      </p>
    </div>
    <div class="mt-6 border-t border-white/10">
      <dl class="divide-y divide-white/10">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">UUID</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.uuid }}
          </dd>
        </div>
        <div
          v-if="task.batch"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-white">Batch</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.batch }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Last modified</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ useTimeAgo(new Date(task.updatedAt)) }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Status</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <span
              :class="{
                'text-yellow-400':
                  task.status === 'RUNNING' ||
                  task.status === 'POST_PROCESSING',
                'text-primary-400': task.status === 'DONE_SUCCESSFUL',
                'text-red-400':
                  task.status === 'DONE_CANCELED' ||
                  task.status === 'DONE_ERROR',
              }"
              >{{ task.status }}</span
            >
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Priority</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.priority }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Progress</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <div
              class="bg-white rounded-xl shadow-sm overflow-hidden p-[.1rem]"
            >
              <div class="relative h-4 flex items-center justify-center">
                <div
                  class="absolute top-0 bottom-0 left-0 rounded-lg bg-primary-400"
                  :style="`width:${task.progress}%`"
                ></div>
                <div class="relative text-primary-900 font-medium text-sm">
                  {{ task.progress }}%
                </div>
              </div>
            </div>
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Input</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.inputFile }}
          </dd>
        </div>
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Output</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.outputFile }}
          </dd>
        </div>
        <div
          v-if="task.postProcessing"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium text-white">Postprocessing</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"></dd>
          <template v-if="task.postProcessing.scriptPath">
            <dt class="text-sm/6 font-medium text-white ml-2">Script path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.postProcessing.scriptPath }}
            </dd>
          </template>
          <template v-if="task.postProcessing.sidecarPath">
            <dt class="text-sm/6 font-medium text-white ml-2">Sidecar patg</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.postProcessing.sidecarPath }}
            </dd>
          </template>
        </div>
      </dl>
    </div>
  </div>
</template>
