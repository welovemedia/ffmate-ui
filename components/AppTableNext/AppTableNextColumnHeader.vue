<script lang="ts" setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import type { Header, Sorting } from "./AppTableNext.vue"

interface Props {
  header: Header;
  headersClass?: string;
  sorting: Sorting | null;
}
defineProps<Props>();
const emit = defineEmits(["update:sorting"]);
</script>

<template>
  <div
    class="h-12 grow border-b border-gray-600 p-4 text-gray-400"
    :class="[{ 'cursor-pointer': header.sortField }, headersClass]"
  >
    <slot name="header.label" :header>
      <div class="flex flex-row items-center space-x-2">
        <span class="line-clamp-1 select-none" @click="emit('update:sorting')"
          >{{ header.label }}
        </span>
        <ChevronDownIcon
          v-if="
            sorting?.fields?.length && sorting?.fields?.[0] === header.sortField
          "
          class="size-2 rotate-180"
          :class="{ '!rotate-0': sorting?.direction === 'DESC' }"
        />
      </div>
    </slot>
  </div>
</template>
