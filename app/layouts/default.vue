<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/solid";

const confirmStore = useConfirmStore();
const logsStore = useLogStore();
const route = useRoute();

const add = () => {
    navigateTo({
        name: route.name?.toString() + "-new",
    });
};
</script>

<template>
    <div class="min-h-screen w-full fixed z-[-1] overflow-hidden">
        <div
            class="absolute inset-0 z-0"
            style="
                background:
                    radial-gradient(
                        ellipse 110% 70% at 25% 80%,
                        rgba(147, 51, 234, 0.12),
                        transparent 55%
                    ),
                    radial-gradient(
                        ellipse 130% 60% at 75% 15%,
                        rgba(59, 130, 246, 0.1),
                        transparent 65%
                    ),
                    radial-gradient(
                        ellipse 80% 90% at 20% 30%,
                        rgba(236, 72, 153, 0.14),
                        transparent 50%
                    ),
                    radial-gradient(
                        ellipse 100% 40% at 60% 70%,
                        rgba(16, 185, 129, 0.08),
                        transparent 45%
                    ),
                    #222;
            "
        />
    </div>

    <ModalConfirm v-if="confirmStore.confirm" :confirm="confirmStore.confirm" />
    <Transition
        enter-from-class="translate-y-[500px] opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-[500px] opacity-0"
    >
        <Logs
            v-if="logsStore.open"
            class="transition-all duration-500 ease-in-out"
        />
    </Transition>
    <div class="min-h-screen w-full flex items-start text-white">
        <Sidebar />
        <button
            v-if="
                route.name == 'watchfolder' ||
                route.name == 'presets' ||
                route.name == 'webhooks'
            "
            type="button"
            class="fixed bottom-12 right-12 z-20 rounded-full bg-primary-600 p-3 text-white shadow-sm hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            @click="add"
        >
            <PlusIcon class="size-5" aria-hidden="true" />
        </button>
        <div class="container w-full mx-auto">
            <div v-if="useCurrentPage().current" class="w-full h-30 py-6">
                <h1>{{ useCurrentPage().current }}</h1>
            </div>
            <NuxtPage />
        </div>
    </div>
</template>
0
