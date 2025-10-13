<script lang="ts" setup>
interface Props {
  translateX?: string;
  duration?: string;
}
defineProps<Props>();
</script>
<template>
  <transition
    :enter-active-class="`transition-all ${duration || 'duration-300'}`"
    :enter-from-class="`${translateX || '-translate-x-4'}`"
    enter-to-class="translate-x-0"
    leave-from-class="translate-x-0"
    :leave-to-class="`${translateX || '-translate-x-4'}`"
    :leave-active-class="`transition-all ${duration || 'duration-300'}`"
  >
    <slot />
  </transition>
</template>
