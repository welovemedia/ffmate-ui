<script lang="ts" setup>
interface Props {
    title?: string;
    description?: string;
}
defineProps<Props>();
</script>
<template>
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div class="px-4 sm:px-0 flex flex-col space-y-2">
            <div class="flex flex-col">
                <h2
                    v-if="title"
                    class="text-base/7 font-semibold text-gray-200"
                >
                    {{ title }}
                </h2>
                <p v-if="description" class="text-sm/6 text-gray-400">
                    {{ description }}
                </p>
            </div>
        </div>
        <slot></slot>
    </div>
</template>
