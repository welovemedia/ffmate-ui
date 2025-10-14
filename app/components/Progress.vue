<script lang="ts" setup>
interface Props {
    status: string;
    progress: number;
    eta?: string;
}
defineProps<Props>();
</script>
<template>
    <div class="flex flex-col text-xs gap-y-1 w-full">
        <div class="flex items-center justify-between">
            <span>Progress</span>
            <div class="flex items-center gap-x-2">
                <span>{{ progress }}%</span>
                <span v-if="eta"> - ETA {{ eta }}</span>
            </div>
        </div>
        <div
            class="relative h-2 flex items-center justify-center bg-gray-600 w-full rounded-lg"
        >
            <div
                class="absolute top-0 bottom-0 left-0 rounded-lg transition-all duration-300 ease-in-out"
                :class="{
                    'bg-blue-300/50':
                        status === 'RUNNING' ||
                        status === 'PRE_PROCESSING' ||
                        status === 'POST_PROCESSING',
                    'bg-green-300/50': status === 'DONE_SUCCESSFUL',
                    'bg-red-300/50': status === 'DONE_ERROR',
                    'bg-yellow-300/50': status === 'DONE_CANCELED',
                }"
                :style="`width:${progress}%`"
            ></div>
        </div>
    </div>
</template>
