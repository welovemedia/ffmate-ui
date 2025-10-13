<script lang="ts" setup>
interface Props {
  translateX?: string;
  duration?: string;
  delay?:string
}
defineProps<Props>();
</script>
<template>
  <transition
    :enter-active-class="`transition-all ${duration || 'duration-300'} ${delay || 'delay-0'}`"
    :enter-from-class="`opacity-0 ${translateX || '-translate-x-4'}`"
    enter-to-class="opacity-100 translate-x-0"
    leave-from-class="opacity-100 translate-x-0"
    :leave-to-class="`opacity-0 ${translateX || '-translate-x-4'}`"
    :leave-active-class="`transition-all ${duration || 'duration-300'} ${delay || 'delay-0'}`"
  >
    <slot />
  </transition>
</template>
