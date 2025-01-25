<script lang="ts" setup>
import type { Watchfolder } from "~/sdk/ffmate/lib/interfaces/watchfolders/watchfolder";

const presetStore = usePresetStore();

interface Props {
  watchfolder: Watchfolder;
}

defineProps<Props>();
</script>

<template>
  <div class="pt-12">
    <div class="px-4 sm:px-0">
      <h3 class="text-base/7 font-semibold text-white">
        {{ watchfolder.name }}
      </h3>
      <p class="max-w-2xl text-sm/6 text-gray-400">
        created {{ useTimeAgo(new Date(watchfolder.createdAt)) }}
      </p>
    </div>
    <div class="mt-6 border-t border-white/10">
      <dl class="divide-y divide-white/10">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">UUID</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ watchfolder.uuid }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Preset</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{
              presetStore.presets.find((p) => p.uuid === watchfolder.preset)
                ?.name
            }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Interval (sec)</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ watchfolder.interval }}s
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Growth check</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ watchfolder.growthChecks }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Path</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ watchfolder.path }}
          </dd>
        </div>
        <div
          v-if="watchfolder.filter?.extensions"
          class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
        >
          <dt class="text-sm/6 font-medium text-white">Filter</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"></dd>
          <template v-if="watchfolder.filter?.extensions?.include?.length">
            <dt class="text-sm/6 font-medium text-white ml-2">Include</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ watchfolder.filter.extensions.include.join(", ") }}
            </dd>
          </template>
          <template v-if="watchfolder.filter?.extensions?.exclude?.length">
            <dt class="text-sm/6 font-medium text-white ml-2">Exclude</dt>
            <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
              {{ watchfolder.filter.extensions.exclude.join(", ") }}
            </dd>
          </template>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Suspended</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ watchfolder.suspended ? "Yes" : "No" }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
