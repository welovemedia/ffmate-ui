<script lang="ts" setup>
interface Props {
  marginX?: string;
  duration?: string;
}
defineProps<Props>();
</script>
<template>
  <transition
    :enter-active-class="`transition-all ${duration || 'duration-300'}`"
    :enter-from-class="`opacity-0 ${marginX || '-ml-4'}`"
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    :leave-to-class="`opacity-0 ${marginX || '-ml-4'}`"
    :leave-active-class="`transition-all ${duration || 'duration-300'}`"
  >
    <slot />
  </transition>
</template>
