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
    enter-from-class="h-0 opacity-0"
    :enter-to-class="`${height} opacity-100`"
    :leave-from-class="`${height} opacity-100`"
    :leave-to-class="`h-0 opacity-0`"
    :leave-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
  >
    <slot />
  </transition>
</template>
