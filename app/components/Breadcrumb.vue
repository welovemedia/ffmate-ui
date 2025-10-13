<script setup lang="ts">
import { BookOpenIcon } from "@heroicons/vue/24/outline";
</script>

<template>
    <div v-if="useSetCurrentPage().current" class="h-30 py-6 ml-12">
        <h3 class="flex items-end gap-x-2">
            {{ useSetCurrentPage().current?.title }}
            <Label
                v-if="useSetCurrentPage().current?.documentation"
                :to="useSetCurrentPage().current?.documentation!"
                ><div class="flex items-center gap-x-1 text-gray-400">
                    <BookOpenIcon class="size-3" />
                    <span>Documentation</span>
                </div></Label
            >
        </h3>
        <h5 class="text-gray-400 text-sm">
            {{ useSetCurrentPage().current?.description }}
        </h5>
    </div>
</template>
