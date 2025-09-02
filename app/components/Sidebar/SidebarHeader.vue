<script lang="ts" setup>
import { ArrowTopRightOnSquareIcon } from "@heroicons/vue/24/solid"

const clientStore = useClientStore()
</script>
<template>
  <header>
    <div class="flex flex-col gap-y-2">
      <div class="flex gap-x-2 items-center">
        <img src="/icon_black.webp" class="h-6" />
        <img src="/logo.webp" class="h-6" />
      </div>
      <div class="flex flex-col">
        <Transition
          enter-from-class="translate-x-[50px] opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-[50px] opacity-0"
        >
          <div v-if="clientStore.isUpdateAvailable" class="flex text-xs mt-2.5">
            <span>Update available</span>
          </div>
        </Transition>
        <Transition
          enter-from-class="translate-x-[50px] opacity-0"
          enter-to-class="translate-x-0 opacity-100"
          leave-from-class="translate-x-0 opacity-100"
          leave-to-class="translate-x-[50px] opacity-0"
        >
          <div v-if="clientStore.isFfmpegFound" class="flex text-xs mt-2.5">
            <a
              href="https://docs.ffmate.io/docs/getting-started#Installing-ffmpeg"
              target="_blank"
              class="flex flex-row gap-x-2 items-center text-primary-300 text-xs"
              ><span>FFmpeg not found </span
              ><ArrowTopRightOnSquareIcon class="size-3"
            /></a>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
