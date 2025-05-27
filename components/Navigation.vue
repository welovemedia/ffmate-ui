<script lang="ts" setup>
import type { RouteLocationNamedRaw } from "vue-router"

const logStore = useLogStore()

const route = useRoute()

const clientStore = useClientStore()

const isActive = (to: RouteLocationNamedRaw) => {
  return route.name?.toString().startsWith(to.name?.toString() ?? "")
}

const menu = [
  {
    label: "Dashboard",
    to: {
      name: "tasks",
    } as RouteLocationNamedRaw,
  },
  {
    label: "Watchfolders",
    to: {
      name: "watchfolders",
    } as RouteLocationNamedRaw,
  },
  {
    label: "Presets",
    to: {
      name: "presets",
    } as RouteLocationNamedRaw,
  },
]
</script>

<template>
  <div
    class="fixed h-12 border-b border-gray-600 bg-[#1a1a1c] backdrop-blur-xl w-full flex flex-row justify-between items-center px-4 z-10"
  >
    <div class="flex w-1/3 flex-row gap-x-2 items-center">
      <img src="/icon_black.webp" class="h-6" />
      <img src="/logo.webp" class="h-6" />
      <Transition
        enter-from-class="translate-x-[50px] opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-[50px] opacity-0"
      >
        <div
          v-if="clientStore.isUpdateAvailable"
          class="flex items-end justify-end text-xs mt-2.5"
        >
          <span>Update available</span>
        </div>
      </Transition>
    </div>

    <div class="w-1/3 flex justify-center">
      <ul class="flex flex-row space-x-6 items-center select-none">
        <li
          v-for="item in menu"
          class="cursor-pointer hover:text-primary-400 transition-colors"
          :class="{ 'text-primary-400': isActive(item.to) }"
          @click="navigateTo(item.to)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="w-1/3 flex justify-end" @click="logStore.open = !logStore.open">
      <Transition
        enter-from-class="translate-x-[50px] opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-[50px] opacity-0"
      >
        <span
          v-if="!logStore.open"
          class="cursor-pointer hover:text-primary-400 transition-all"
          >Logs</span
        >
      </Transition>
    </div>
  </div>
</template>
