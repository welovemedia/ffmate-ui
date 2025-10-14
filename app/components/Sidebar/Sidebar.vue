<script lang="ts" setup>
import {
    ArrowDownTrayIcon,
    BookmarkIcon,
    CommandLineIcon,
    UserIcon,
} from "@heroicons/vue/24/outline";
import {
    FireIcon,
    FolderIcon,
    InboxArrowDownIcon,
    PaperAirplaneIcon,
    PencilSquareIcon,
} from "@heroicons/vue/24/solid";
import type { RouteLocationNamedRaw } from "vue-router";
import { useViewportStore } from "~/stores/viewportStore";

const viewportStore = useViewportStore();
const clientStore = useClientStore();
const menu = [
    {
        label: "Dashboard",
        icon: FireIcon,
        badge: "",
        to: {
            name: "tasks",
        } as RouteLocationNamedRaw,
    },
    {
        label: "Watchfolder",
        icon: FolderIcon,
        to: {
            name: "watchfolder",
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
    {
        label: "Clients",
        icon: UserIcon,
        to: {
            name: "clients",
        } as RouteLocationNamedRaw,
    },
    // {
    //     label: "Settings",
    //     icon: AdjustmentsVerticalIcon,
    //     to: {
    //         name: "settings",
    //     } as RouteLocationNamedRaw,
    // },
];

const menuBottom = computed(() => [
    {
        label: "Updates",
        icon: ArrowDownTrayIcon,
        badge: clientStore.isUpdateAvailable ? "1" : undefined,
        to: {
            name: "updates",
        } as RouteLocationNamedRaw,
    },
    {
        label: "Logs",
        icon: CommandLineIcon,
        to: {
            name: "logs",
        } as RouteLocationNamedRaw,
    },
]);
</script>

<template>
    <!-- placeholder for fixed sidebar -->
    <div
        class="h-screen transition-normal duration-300"
        :class="{
            'w-60 max-w-60 min-w-60': viewportStore.sidebar.expand,
            'w-15 max-w-15 min-w-15': !viewportStore.sidebar.expand,
        }"
    ></div>

    <div
        class="fixed flex flex-col justify-between h-screen top-0 left-0 backdrop-blur-3xl bg-white/10 border-r border-white/10 shadow-xl shadow-black/20 transition-normal duration-300"
        :class="{
            'w-60': viewportStore.sidebar.expand,
            'w-15': !viewportStore.sidebar.expand,
        }"
    >
        <ul class="flex flex-col gap-y-2 text-xs mx-auto w-full p-3">
            <li class="mb-12">
                <SidebarHeader />
            </li>
            <li v-for="item in menu" :key="item.label">
                <NuxtLink
                    :to="item.to"
                    class="size-8 flex-row cursor-pointer transition-color duration-200 px-2 overflow-hidden p-3 rounded-lg hover:bg-white/10 flex gap-x-2 items-center text-gray-300 hover:text-white whitespace-nowrap justify-between"
                    :class="{
                        'bg-white/10 text-white': useIsRouteActive(item.to),
                        'w-full': viewportStore.sidebar.expand,
                    }"
                >
                    <div class="flex gap-x-2 items-center">
                        <component
                            :is="item.icon"
                            class="relative size-4 min-w-4"
                        />
                        <span class="inline">{{ item.label }}</span>
                    </div>
                    <badge v-if="item.badge">
                        {{ item.badge }}
                    </badge>
                </NuxtLink>
            </li>
        </ul>

        <ul class="flex flex-col gap-y-2 text-xs mx-auto w-full p-3">
            <li
                v-for="item in menuBottom"
                :key="item.label"
                class="flex justify-between items-center"
            >
                <NuxtLink
                    :to="item.to"
                    class="size-8 flex-row cursor-pointer transition-color duration-200 px-2 overflow-hidden p-3 rounded-lg hover:bg-white/10 flex gap-x-2 items-center text-gray-300 hover:text-white whitespace-nowrap justify-between"
                    :class="{
                        'bg-white/10 text-white': useIsRouteActive(item.to),
                        'w-full': viewportStore.sidebar.expand,
                    }"
                >
                    <div class="flex gap-x-2 items-center">
                        <component
                            :is="item.icon"
                            class="relative size-4 min-w-4"
                        />
                        <span class="inline">{{ item.label }}</span>
                    </div>
                    <badge v-if="item.badge">
                        {{ item.badge }}
                    </badge>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink
                    to="https://docs.ffmate.io"
                    target="_blank"
                    class="size-8 flex-row justify-start cursor-pointer transition-color duration-200 px-2 overflow-hidden p-3 rounded-lg hover:bg-white/10 flex gap-x-2 items-center text-gray-300 hover:text-white whitespace-nowrap"
                    :class="{
                        'w-full': viewportStore.sidebar.expand,
                    }"
                >
                    <BookmarkIcon class="relative size-4 min-w-4" />
                    <span class="inline">Documentation</span>
                </NuxtLink>
            </li>
        </ul>
    </div>
</template>
