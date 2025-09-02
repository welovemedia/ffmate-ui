<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline"
import { ref } from "vue"

interface Props {
  confirm: Confirm
}
defineProps<Props>()

const open = ref(true)
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="z-10 overflow-hidden" @close="confirm.cancelCallback?.()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-black/10 z-20 backdrop-blur-lg transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-30 w-screen overflow-hidden">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white/10 backdrop-blur-3xl px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="sm:flex sm:items-start">
                <div
                  class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-100 sm:mx-0 sm:size-10"
                >
                  <ExclamationTriangleIcon
                    class="size-6 text-primary-500"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold text-gray-100"
                    >{{ confirm.title }}</DialogTitle
                  >
                  <div class="mt-2">
                    <p class="text-sm text-gray-300">
                      {{ confirm.message }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="mt-5 flex flex-row space-x-4 justify-end items-center"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 sm:ml-3 sm:w-auto"
                  @click="confirm.cancelCallback?.()"
                >
                  Close
                </button>
                <button
                  type="button"
                  focus
                  class="inline-flex w-full justify-center rounded-md bg-primary-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-primary-500 sm:mt-0 sm:w-auto"
                  @click="confirm.successCallback()"
                  ref="cancelButtonRef"
                >
                  Confirm
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
