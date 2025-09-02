<script lang="ts" setup>
import type { Preset } from "~/sdk/ffmate/lib/interfaces/presets/preset";

interface Props {
  preset: Preset
}

defineProps<Props>()
</script>

<template>
  <div class="pt-12">
    <div class="px-4 sm:px-0">
      <h3 class="text-base/7 font-semibold text-white">
        {{ preset.name }}
      </h3>
      <p class="max-w-2xl text-sm/6 text-gray-400">
        created {{ useTimeAgo(new Date(preset.createdAt)) }}
      </p>
    </div>
    <div class="mt-6 border-t border-white/10">
      <dl class="divide-y divide-white/10">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">UUID</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ preset.uuid }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Priority</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ preset.priority }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Command</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ preset.command }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Output</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ preset.outputFile }}
          </dd>
        </div>

        <div
          v-if="preset.preProcessing"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium text-white">PreProcessing</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"></dd>

          <template v-if="preset.preProcessing?.scriptPath">
            <dt class="text-sm/6 font-medium text-white ml-2">Script path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ preset.preProcessing.scriptPath }}
            </dd>
          </template>
          <template v-if="preset.preProcessing?.sidecarPath">
            <dt class="text-sm/6 font-medium text-white ml-2">Sidecar path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ preset.preProcessing.sidecarPath }}
            </dd>
          </template>
          <dt class="text-sm/6 font-medium text-white ml-2">Import Sidecar</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ preset.preProcessing.importSidecar ?? "false" }}
          </dd>
        </div>

        <div
          v-if="preset.postProcessing"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm font-medium text-white">PostProcessing</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"></dd>

          <template v-if="preset.postProcessing?.scriptPath">
            <dt class="text-sm/6 font-medium text-white ml-2">Script path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ preset.postProcessing.scriptPath }}
            </dd>
          </template>
          <template v-if="preset.postProcessing?.sidecarPath">
            <dt class="text-sm/6 font-medium text-white ml-2">Sidecar path</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ preset.postProcessing.sidecarPath }}
            </dd>
          </template>
        </div>
      </dl>
    </div>
  </div>
</template>
