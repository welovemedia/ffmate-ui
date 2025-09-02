<script lang="ts" setup>
const taskStore = useTaskStore()
const presetStore = usePresetStore()
const watchfolderStore = useWatchfolderStore()
const webhookStore = useWebhookStore()
const webhookExecutionStore = useWebhookExecutionStore()

const { perPage } = useConfig()

onMounted(() => {
  taskStore.load(0, perPage)
  presetStore.load(0, perPage)
  watchfolderStore.load(0, perPage)
  webhookStore.load(0, perPage)
  webhookExecutionStore.load(0, perPage)
})
</script>

<template>
  <NuxtLayout />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.15s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  translate: -2rem;
  filter: blur(1rem);
}
</style>
