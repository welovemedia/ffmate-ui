<script lang="ts" setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";

const logStore = useLogStore();
const viewportStore = useViewportStore();
const logs = computed(() => {
    return logStore.logs;
});
</script>

<template>
    <div
        class="logger fixed shadow-[0_0_20px_0_rgba(0,0,0,.5)] h-[500px] rounded-t-lg text-xs bottom-0 bg-gray-700/50 backdrop-blur-3xl text-gray-300 z-50 overflow-y-auto transition-all duration-300"
        :class="{
            'ml-71 w-[calc(100vw-theme(spacing.72))]':
                viewportStore.sidebar.expand,
            'ml-16 w-[calc(100vw-theme(spacing.16))]':
                !viewportStore.sidebar.expand,
        }"
    >
        <div class="flex flex-col gap-y-2 justify-between items-start p-5">
            <div
                class="flex flex-row w-full justify-between space-x-4 items-center sticky top-5"
            >
                <span
                    class="text-xs text-gray-400 hover:text-gray-300 cursor-pointer"
                    @click="logStore.logs = []"
                    >Clear all entries ({{ logs.length }})
                </span>
                <XMarkIcon
                    class="size-5 text-gray-400 hover:text-gray-300 cursor-pointer"
                    @click="viewportStore.logs.open = !viewportStore.logs.open"
                />
            </div>
            <ul class="flex flex-col-reverse grow font-[Monospace]">
                <li v-for="log in logs" :key="log">{{ log }}</li>
            </ul>
        </div>
    </div>
</template>
