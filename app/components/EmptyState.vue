<script lang="ts" setup>
interface Props {
  title?: string;
  message?: string;
  button?: string;
  buttonAction?: () => void;
}
defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center justify-center w-96 mx-auto mt-12">
    <slot name="title">
      <span v-if="title" class="text-md">{{ title }}</span></slot
    >
    <slot name="message">
      <p v-if="message" class="text-md">{{ message }}</p>
    </slot>
    <slot name="button">
      <button
        v-if="button"
        type="submit"
        class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        @click.stop="buttonAction?.()"
      >
        {{ button }}
      </button>
    </slot>
  </div>
</template>
