<script lang="ts" setup>
interface Props {
  delay?: string;
  height: string;
  duration?: string;
}
defineProps<Props>();
</script>
<template>
  <transition
    :enter-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
    enter-from-class="h-0"
    :enter-to-class="`${height}`"
    :leave-from-class="`${height}`"
    :leave-to-class="`h-0`"
    :leave-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
  >
    <slot />
  </transition>
</template>
