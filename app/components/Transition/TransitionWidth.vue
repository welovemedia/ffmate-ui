<script lang="ts" setup>
interface Props {
  delay?: string;
  width: string;
  duration?: string;
}
defineProps<Props>();
</script>
<template>
  <transition
    :enter-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
    enter-from-class="w-0"
    :enter-to-class="`${width}`"
    :leave-from-class="`${width}`"
    :leave-to-class="`w-0`"
    :leave-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
  >
    <slot />
  </transition>
</template>
