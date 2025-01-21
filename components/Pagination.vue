<script lang="ts" setup>
interface Props {
    page: number;
    perPage: number;
    total: number;
}
defineProps<Props>();
</script>

<template>
    <nav
        class="flex flex-row space-x-2 items-center justify-between"
        aria-label="Pagination"
    >
        <div class="hidden sm:block">
            <div
                class="text-sm font-[Monospace] text-gray-400 flex flex-row space-x-2 items-center"
            >
                <a
                    v-if="page"
                    href="#"
                    class="hover:text-gray-200"
                    @click.prevent="$emit('previous')"
                    >&lt;</a
                >
                <div class="flex flex-row items-center">
                    <span class="font-medium">{{ page * perPage + 1 }} </span>
                    <span>-</span>
                    <span class="font-medium">{{
                        Math.min((page + 1) * perPage, total)
                    }}</span>
                </div>
                <span>/</span>
                <span class="font-medium">{{ total }}</span>
                <a
                    v-if="page + 1 < total / perPage"
                    href="#"
                    class="hover:text-gray-200"
                    @click.prevent="$emit('next')"
                    >&gt;</a
                >
            </div>
        </div>
    </nav>
</template>
