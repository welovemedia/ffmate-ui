<script lang="ts" setup>
interface Props {
  selected: boolean;
  indeterminate?: boolean;
}
defineProps<Props>();
const emit = defineEmits(["update:select"]);
</script>

<template>
  <input
    type="checkbox"
    class="text-primary-500 focus:ring-primary-500 size-4 cursor-pointer rounded border-gray-300"
    :checked="selected"
    :indeterminate="indeterminate"
    @change="emit('update:select')"
  />
</template>
