<script lang="ts" setup>
import {
  WebhookEvent,
  type NewWebhook,
  type Webhook,
} from "~/sdk/ffmate/lib/interfaces/webhooks/webhook"

const route = useRoute()

const editWebhook = ref<Webhook | null>(null)
const editwebhookId = route.query["edit"] as string
useCurrentPage().setCurrent(editwebhookId ? "Edit webhook" : "New webhook")

const form = reactive({
  event: editWebhook.value?.event ?? WebhookEvent.TASK_CREATED,
  url: editWebhook.value?.url ?? "",
})
if (editwebhookId) {
  await useFFMate()
    .Webhook.getWebhook(editwebhookId)
    .then((w) => {
      form.event = w.event
      form.url = w.url
      editWebhook.value = w
    })
}

const save = () => {
  const n = {
    event: form.event,
    url: form.url,
  } as NewWebhook

  if (editWebhook.value) {
    useFFMate()
      .Webhook.update(editWebhook.value.uuid, n)
      .then(() => {
        navigateTo({ name: "webhooks" })
      })
  } else {
    useFFMate()
      .Webhook.create(n)
      .then(() => {
        navigateTo({ name: "webhooks" })
      })
  }
}
</script>

<template>
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base/7 font-semibold text-gray-200">
        {{ editwebhookId ? "Edit" : "New" }} Webhook
      </h2>
      <p class="mt-1 text-sm/6 text-gray-400">
        {{
          editwebhookId
            ? "Edit webhook to automatically call an URL on certain events"
            : "Create a new webhook to automatically call an URL on certain events"
        }}
      </p>
    </div>

    <form
      class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      @submit.prevent="save"
    >
      <div class="px-4 py-6 sm:p-8">
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-full">
            <div>
              <label
                for="location"
                class="block text-sm/6 font-medium text-white"
                >Preset *</label
              >
              <div class="mt-2 grid grid-cols-1">
                <FormFieldSelect
                  id="preset"
                  name="preset"
                  :options="
                    Object.values(WebhookEvent).map((e) => ({
                      label: e,
                      key: e,
                    }))
                  "
                  v-model="form.event"
                />
              </div>
            </div>
          </div>

          <div class="sm:col-span-full">
            <label
              for="first-name"
              class="block text-sm/6 font-medium text-gray-200"
              >Name *</label
            >
            <div class="mt-2">
              <input
                v-model="form.url"
                placeholder="Enter webhook URL"
                type="text"
                name="url"
                id="url"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
      >
        <button
          type="button"
          class="text-sm/6 font-semibold text-gray-200 cursor-pointer"
          @click="navigateTo({ name: 'webhooks' })"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
        >
          {{ editwebhookId ? "Update" : "Create" }}
        </button>
      </div>
    </form>
  </div>
</template>
