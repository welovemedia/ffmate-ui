<script lang="ts" setup>
import { ChevronDownIcon } from "@heroicons/vue/24/outline";
import { useViewportStore } from "~/stores/viewportStore";

const clientStore = useClientStore();
const viewportStore = useViewportStore();
</script>
<template>
    <header>
        <ChevronDownIcon
            class="absolute size-6 right-0 mt-6 -mr-8 cursor-pointer transition-all duraiton-300"
            :class="{
                'rotate-90 ': viewportStore.sidebar.expand,
                '-rotate-90 ': !viewportStore.sidebar.expand,
            }"
            @click="
                viewportStore.sidebar.expand = !viewportStore.sidebar.expand
            "
        />
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
            <div class="flex flex-col">
                <!-- <Transition
                    enter-from-class="translate-x-[50px] opacity-0"
                    enter-to-class="translate-x-0 opacity-100"
                    leave-from-class="translate-x-0 opacity-100"
                    leave-to-class="translate-x-[50px] opacity-0"
                >
                    <div
                        v-if="
                            clientStore.isReady && clientStore.isUpdateAvailable
                        "
                        class="flex text-xs mt-2.5"
                    >
                        <span>Update available</span>
                    </div>
                </Transition>
                <Transition
                    enter-from-class="translate-x-[50px] opacity-0"
                    enter-to-class="translate-x-0 opacity-100"
                    leave-from-class="translate-x-0 opacity-100"
                    leave-to-class="translate-x-[50px] opacity-0"
                >
                    <div
                        v-if="clientStore.isReady && !clientStore.isFFmpegFound"
                        class="flex text-xs mt-2.5"
                    >
                        <a
                            href="https://docs.ffmate.io/docs/getting-started#Installing-ffmpeg"
                            target="_blank"
                            class="flex flex-row gap-x-2 items-center text-primary-300 text-xs"
                            ><span>FFmpeg not found </span
                            ><ArrowTopRightOnSquareIcon class="size-3"
                        /></a>
                    </div>
                </Transition> -->
            </div>
        </div>
    </header>
</template>
