<script lang="ts" setup>
interface Props {
    label?: string;
    to: string;
}
defineProps<Props>();
</script>

<template>
    <NuxtLink
        target="_blank"
        :to="to"
        class="hover:bg-gray-800 px-2 py-1 rounded-lg text-xs"
    >
        <slot>
            <span v-if="label">{{ label }}</span>
        </slot>
    </NuxtLink>
</template>
