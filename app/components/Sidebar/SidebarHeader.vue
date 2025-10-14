<script lang="ts" setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { useViewportStore } from "~/stores/viewportStore";

const clientStore = useClientStore();
const viewportStore = useViewportStore();
</script>
<template>
    <header>
        <div class="flex flex-col gap-y-2">
            <div class="flex gap-x-2 ml-1.5 items-center">
                <img src="/icon_black.webp" class="h-6" />
                <TransitionOpacity
                    :delay="
                        viewportStore.sidebar.expand ? 'delay-300' : 'delay-0'
                    "
                >
                    <img
                        v-if="viewportStore.sidebar.expand"
                        src="/logo.webp"
                        class="h-6"
                    />
                </TransitionOpacity>
            </div>
        </div>
    </header>
</template>
