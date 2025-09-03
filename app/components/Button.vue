<script lang="ts" setup>
interface Props {
    type?: "cancel";
}
defineProps<Props>();
</script>

<template>
    <button
        type="button"
        class="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
        :class="{
            'bg-gray-500 hover:bg-gray-600': type === 'cancel',
            'bg-primary-500 hover:bg-primary-600': !type,
        }"
    >
        <slot></slot>
    </button>
</template>
