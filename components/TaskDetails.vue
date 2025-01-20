<script lang="ts" setup>
import humanizer from "humanize-duration";
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
        created {{ useTimeAgo(new Date(task.createdAt)) }}
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
          <dt class="text-sm/6 font-medium text-white">Priority</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.priority }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Status</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <span
              :class="{
                'text-blue-400':
                  task.status === 'RUNNING' || 
                  task.status === 'PRE_PROCESSING' ||
                  task.status === 'POST_PROCESSING',
                'text-green-400': task.status === 'DONE_SUCCESSFUL',
                'text-yellow-400': task.status === 'DONE_CANCELED',
                'text-red-400': task.status === 'DONE_ERROR',
              }"
              >{{ task.status }}</span
            >
          </dd>
        </div>

        <div
          v-if="task.error"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-white">Error</dt>
          <dd
            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 break-all overflow-x-hidden"
          >
            <span class="text-red-500">{{ task.error }}</span>
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
                  class="absolute top-0 bottom-0 left-0 rounded-lg transition-all duration-300 ease-in-out"
                  :class="{
                    'bg-blue-500':
                      task.status === 'RUNNING' ||
                      task.status === 'PRE_PROCESSING' ||
                      task.status === 'POST_PROCESSING',
                    'bg-green-400': task.status === 'DONE_SUCCESSFUL',
                    'bg-red-400': task.status === 'DONE_ERROR',
                    'bg-yellow-400': task.status === 'DONE_CANCELED',
                  }"
                  :style="`width:${task.progress}%`"
                ></div>
                <div class="relative text-primary-900 font-medium text-sm">
                  {{ task.progress }}%
                </div>
              </div>
            </div>
          </dd>
          <template v-if="task.startedAt && !task.finishedAt">
            <dt class="text-sm/6 font-medium text-white ml-2"></dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              started {{ useTimeAgo(new Date(task.startedAt)) }}
            </dd>
          </template>
          <template v-else-if="task.startedAt && task.finishedAt">
            <dt class="text-sm/6 font-medium text-white ml-2"></dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              finished {{ useTimeAgo(new Date(task.finishedAt)) }} after
              <span class="font-bold">{{
                humanizer(task.finishedAt - task.startedAt)
              }}</span>
            </dd>
          </template>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Command</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.command.raw }}
          </dd>
          <template v-if="task.command.resolved">
            <dt class="text-sm/6 font-medium text-white ml-2">Resolved</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.command.resolved }}
            </dd>
          </template>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Input</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.inputFile }}
          </dd>
          <template v-if="task.inputFile.resolved">
            <dt class="text-sm/6 font-medium text-white ml-2">Resolved</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.inputFile.resolved }}
            </dd>
          </template>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Output</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ task.outputFile }}
          </dd>
          <template v-if="task.outputFile.resolved">
            <dt class="text-sm/6 font-medium text-white ml-2">Resolved</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.outputFile.resolved }}
            </dd>
          </template>
        </div>

        <div
          v-if="task.preProcessing"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium text-white">PreProcessing</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <template
              v-if="
                task.preProcessing.startedAt && !task.preProcessing.finishedAt
              "
            >
              <dt class="text-sm/6 font-medium text-white ml-2"></dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                started
                {{ useTimeAgo(new Date(task.preProcessing.startedAt)) }}
              </dd>
            </template>
            <template
              v-if="
                task.preProcessing.startedAt && task.preProcessing.finishedAt
              "
            >
              <dt class="text-sm/6 font-medium text-white ml-2"></dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                finished
                {{ useTimeAgo(new Date(task.preProcessing.finishedAt)) }} after
                <span class="font-bold">{{
                  humanizer(
                    task.preProcessing.finishedAt -
                      task.preProcessing.startedAt
                  )
                }}</span>
              </dd>
            </template>
          </dd>
          <template v-if="task.preProcessing.error">
            <dt class="text-sm/6 font-medium text-white ml-2">Error</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              <span class="text-red-500">{{ task.preProcessing.error }}</span>
            </dd>
          </template>
          <template v-if="task.preProcessing?.scriptPath?.raw">
            <dt class="text-sm/6 font-medium text-white ml-2">Script path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.preProcessing.scriptPath.raw }}
            </dd>
            <template v-if="task.preProcessing?.scriptPath?.resolved">
              <dt class="text-sm/6 font-medium text-white ml-4">Resolved</dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                {{ task.preProcessing.scriptPath.resolved }}
              </dd>
            </template>
          </template>
          <template v-if="task.preProcessing?.sidecarPath?.raw">
            <dt class="text-sm/6 font-medium text-white ml-2">Sidecar path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.preProcessing.sidecarPath.raw }}
            </dd>
            <template v-if="task.preProcessing?.sidecarPath?.resolved">
              <dt class="text-sm/6 font-medium text-white ml-4">Resolved</dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                {{ task.preProcessing.sidecarPath.resolved }}
              </dd>
            </template>
          </template>
        </div>
        
        <div
          v-if="task.postProcessing"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium text-white">PostProcessing</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <template
              v-if="
                task.postProcessing.startedAt && !task.postProcessing.finishedAt
              "
            >
              <dt class="text-sm/6 font-medium text-white ml-2"></dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                started
                {{ useTimeAgo(new Date(task.postProcessing.startedAt)) }}
              </dd>
            </template>
            <template
              v-if="
                task.postProcessing.startedAt && task.postProcessing.finishedAt
              "
            >
              <dt class="text-sm/6 font-medium text-white ml-2"></dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                finished
                {{ useTimeAgo(new Date(task.postProcessing.finishedAt)) }} after
                <span class="font-bold">{{
                  humanizer(
                    task.postProcessing.finishedAt -
                      task.postProcessing.startedAt
                  )
                }}</span>
              </dd>
            </template>
          </dd>
          <template v-if="task.postProcessing.error">
            <dt class="text-sm/6 font-medium text-white ml-2">Error</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              <span class="text-red-500">{{ task.postProcessing.error }}</span>
            </dd>
          </template>
          <template v-if="task.postProcessing?.scriptPath?.raw">
            <dt class="text-sm/6 font-medium text-white ml-2">Script path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.postProcessing.scriptPath.raw }}
            </dd>
            <template v-if="task.postProcessing?.scriptPath?.resolved">
              <dt class="text-sm/6 font-medium text-white ml-4">Resolved</dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                {{ task.postProcessing.scriptPath.resolved }}
              </dd>
            </template>
          </template>
          <template v-if="task.postProcessing?.sidecarPath?.raw">
            <dt class="text-sm/6 font-medium text-white ml-2">Sidecar path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ task.postProcessing.sidecarPath.raw }}
            </dd>
            <template v-if="task.postProcessing?.sidecarPath?.resolved">
              <dt class="text-sm/6 font-medium text-white ml-4">Resolved</dt>
              <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                {{ task.postProcessing.sidecarPath.resolved }}
              </dd>
            </template>
          </template>
        </div>
      </dl>
    </div>
  </div>
</template>
