<script lang="ts" setup>
import type { RouteLocationNamedRaw } from "vue-router";

const route = useRoute();

const isActive = (to: RouteLocationNamedRaw) => {
  return route.name?.toString().startsWith(to.name?.toString() ?? "");
};

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
];
</script>

<template>
  <div
    class="fixed h-12 border-b border-gray-600 bg-[#1a1a1c] backdrop-blur-xl w-full flex flex-row justify-between items-center px-4 z-10"
  >
    <div class="flex w-1/3 flex-row space-x-2 items-center">
      <img src="/icon_black.webp" class="h-6" />
      <img src="/logo.webp" class="h-6" />
    </div>

    <div class="w-1/3 flex justify-center">
      <ul class="flex flex-row space-x-6 items-center select-none">
        <li
          v-for="item in menu"
          class="cursor-pointer"
          :class="{ 'text-primary-400': isActive(item.to) }"
          @click="navigateTo(item.to)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="w-1/3">&nbsp;</div>
  </div>
</template>
