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
        class="flex flex-row space-x-2 items-center justify-between select-none"
        aria-label="Pagination"
    >
        <div class="hidden sm:block">
            <div
                class="text-sm font-[Monospace] text-gray-400 flex flex-row space-x-2 items-center"
            >
                <a
                    href="#"
                    :class="{ invisible: page <= 0 }"
                    class="hover:text-gray-200"
                    @click.prevent="$emit('previous')"
                    >&lt;</a
                >
                <div class="flex flex-row items-center w-32 justify-center">
                    <div class="flex flex-row items-center">
                        <span class="font-medium"
                            >{{ page * perPage + 1 }}
                        </span>
                        <span>-</span>
                        <span class="font-medium">{{
                            Math.min((page + 1) * perPage, total)
                        }}</span>
                    </div>
                    <span>/</span>
                    <span class="font-medium">{{ total }}</span>
                </div>
                <a
                    href="#"
                    class="hover:text-gray-200"
                    :class="{ invisible: page + 1 > total / perPage }"
                    @click.prevent="$emit('next')"
                    >&gt;</a
                >
            </div>
        </div>
    </nav>
</template>
