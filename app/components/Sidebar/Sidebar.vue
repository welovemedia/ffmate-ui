<script lang="ts" setup>
import {
  Bars3Icon,
  FireIcon,
  FolderIcon,
  InboxArrowDownIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
} from "@heroicons/vue/24/solid"
import type { RouteLocationNamedRaw } from "vue-router"

const logStore = useLogStore()

const menu = [
  {
    label: "Dashboard",
    icon: FireIcon,
    to: {
      name: "tasks",
    } as RouteLocationNamedRaw,
  },
  {
    label: "Watchfolder",
    icon: FolderIcon,
    to: {
      name: "watchfolders",
    } as RouteLocationNamedRaw,
  },
  {
    label: "Presets",
    icon: PencilSquareIcon,
    to: {
      name: "presets",
    } as RouteLocationNamedRaw,
  },
  {
    label: "Webhooks",
    icon: PaperAirplaneIcon,
    to: {
      name: "webhooks",
    } as RouteLocationNamedRaw,
  },
  {
    label: "Sent hooks",
    icon: InboxArrowDownIcon,
    to: {
      name: "executions",
    } as RouteLocationNamedRaw,
  },
]

const menuBottom = [
  {
    label: "Logs",
    icon: Bars3Icon,
    fn: () => (logStore.open = !logStore.open),
  },
]
</script>

<template>
  <!-- placeholder for fixed sidebar -->
  <div class="min-w-70 w-70 h-screen"></div>

  <div
    class="fixed flex flex-col justify-between w-70 h-screen top-0 left-0 backdrop-blur-3xl bg-white/10 border-r border-white/10 shadow-xl shadow-black/20"
  >
    <ul class="flex flex-col gap-y-2 p-4 text-xs">
      <li class="mb-12">
        <SidebarHeader />
      </li>
      <li v-for="item in menu" :key="item.label">
        <NuxtLink
          :to="item.to"
          class="px-4 py-2 rounded-lg hover:bg-white/10 flex gap-x-2 items-center text-gray-300 hover:text-white"
          :class="{
            'bg-white/10 text-white': useIsRouteActive(item.to),
          }"
        >
          <component :is="item.icon" class="size-4" />
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>

    <ul class="flex flex-col gap-y-2 p-4 text-xs">
      <li v-for="item in menuBottom" :key="item.label">
        <span
          class="px-4 py-2 rounded-lg hover:bg-white/10 flex gap-x-2 items-center text-gray-300 hover:text-white cursor-pointer"
          @click="item.fn"
        >
          <component :is="item.icon" class="size-4" />
          {{ item.label }}
        </span>
      </li>
    </ul>
  </div>
</template>
