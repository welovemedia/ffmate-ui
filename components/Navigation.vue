<script lang="ts" setup>
import type { RouteLocationNamedRaw } from "vue-router";

const route = useRoute();

const isActive = (to: RouteLocationNamedRaw) => {
  return to.name === route.name;
};

const menu = [
  {
    label: "Dashboard",
    to: {
      name: "index",
    } as RouteLocationNamedRaw,
  },
];
</script>

<template>
  <div
    class="fixed h-12 border-b border-gray-700 bg-gray-950/50 backdrop-blur-xl w-full flex flex-row justify-between items-center px-4 z-50"
  >
    <div class="w-1/3"><img src="/logo.webp" class="h-6" /></div>
    <div class="w-1/3 flex justify-center">
      <ul>
        <li
          v-for="item in menu"
          :class="{ 'text-primary-400': isActive(item.to) }"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="w-1/3">&nbsp;</div>
  </div>
</template>
