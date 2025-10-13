<script lang="ts" setup>
interface Props {
  delay?: string;
  translateY?: string;
  duration?: string;
}
defineProps<Props>();
</script>
<template>
  <transition
    :enter-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
    :enter-from-class="`opacity-0 ${translateY || '-translate-y-4'}`"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    :leave-to-class="`opacity-0 ${translateY || '-translate-y-4'}`"
    :leave-active-class="`transition-all ${duration || 'duration-300'} ${delay || ''}`"
  >
    <slot />
  </transition>
</template>
