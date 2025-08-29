<script lang="ts" setup>
import { PlusIcon } from "@heroicons/vue/24/solid"

const confirmStore = useConfirmStore()
const logsStore = useLogStore()
const route = useRoute()

const add = () => {
  navigateTo({
    name: route.name?.toString() + "-new",
  })
}
</script>

<template>
  <ModalConfirm v-if="confirmStore.confirm" :confirm="confirmStore.confirm" />
  <Transition
    enter-from-class="translate-y-[500px] opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-[500px] opacity-0"
  >
    <Logs
      v-if="logsStore.open"
      class="transition-all duration-500 ease-in-out"
    />
  </Transition>
  <div class="min-h-screen w-full bg-[#18181a] text-white">
    <Navigation />
    <div class="container pt-12 w-full m-auto">
      <button
        v-if="
          route.name == 'watchfolders' ||
          route.name == 'presets' ||
          route.name == 'webhooks'
        "
        type="button"
        class="fixed bottom-12 right-12 z-20 rounded-full bg-primary-600 p-3 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        @click="add"
      >
        <PlusIcon class="size-5" aria-hidden="true" />
      </button>
      <NuxtPage />
    </div>
  </div>
</template>
0
