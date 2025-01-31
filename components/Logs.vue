<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/solid"
import { useLogStore } from "~/stores/logStore"

const logStore = useLogStore()
const logs = computed(() => {
  return logStore.logs
})
</script>

<template>
  <div
    class="logger fixed w-[calc(100vw-50px)] ml-[25px] shadow-[0_0_20px_0_rgba(0,0,0,.5)] h-[500px] rounded-t-lg text-xs bottom-0 bg-gray-700/50 backdrop-blur-3xl text-gray-300 z-50 overflow-y-auto"
  >
    <div class="flex flex-row justify-between items-start p-5">
      <ul class="flex flex-col-reverse grow font-[Monospace]">
        <li v-for="log in logs" :key="log">{{ log }}</li>
      </ul>
      <div class="flex flex-row space-x-4 items-center sticky top-5">
        <span
          class="text-xs text-gray-400 hover:text-gray-300 cursor-pointer"
          @click="logs = []"
          >Clear all entries ({{ logs.length }})
        </span>
        <span>|</span>
        <XMarkIcon
          class="size-5 text-gray-400 hover:text-gray-300 cursor-pointer"
          @click="logStore.open = !logStore.open"
        />
      </div>
    </div>
  </div>
</template>
