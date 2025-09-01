<script lang="ts" setup>
import {
  ArrowTopRightOnSquareIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/24/solid"
import type { Webhook } from "~/sdk/ffmate/lib/interfaces/webhooks/webhook"

const webhookStore = useWebhookStore()
const { perPage } = useConfig()
const page = ref(0)

watch(page, () => {
  webhookStore.load(page.value, perPage)
})

const selectedItems = ref<string[]>([])

const editWebhook = (webhook: Webhook) => {
  useRouter().push({
    name: "webhooks-new",
    query: { edit: webhook.uuid },
  })
}

const deleteWebhook = (webhook: Webhook) => {
  useConfirm({
    title: "Delete Webhook",
    message: `Do you really want to delete the webhook "${webhook.event}"?`,
    successCallback: async () => {
      await webhookStore.delete(webhook.uuid)
    },
  })
}

const webhooks = computed(() => {
  return webhookStore.webhooks
})

const tableItems = computed(() => {
  return webhooks.value.map((t: Webhook) => {
    const cells = [
      {
        label: t.event,
        id: "event",
      },
      {
        label: t.url,
        id: "url",
      },
      {
        label: useTimeAgo(new Date(t.updatedAt)).value,
        id: "updatedAt",
      },
      { label: "" },
    ]

    return {
      raw: t,
      uuid: t.uuid,
      cells: cells,
    }
  })
})
</script>

<template>
  <AppTableNext
    :headers="[
      { label: 'Event' },
      { label: 'Url', id: 'url' },
      { label: 'Last modified' },
      { label: 'pagination', columnClass: 'w-16' },
    ]"
    :rows="tableItems"
  >
    <template #header.label="{ header }">
      <Pagination
        v-if="header.label === 'pagination'"
        :page="page"
        :perPage="perPage"
        :total="webhookStore.total"
        @next="page++"
        @previous="page--"
      />
    </template>
    <template #cell.label="{ cell, hoveredRow }">
      <NuxtLink
        v-if="cell.id === 'url'"
        :to="cell.raw.url"
        target="_blank"
        class="flex gap-x-2 items-center group"
        ><span>{{ cell.raw.url }}</span>
        <ArrowTopRightOnSquareIcon
          class="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-100"
      /></NuxtLink>
      <div
        v-if="cell.id === 'chevron'"
        class="flex flex-row space-x-2 justify-end w-full"
      >
        <template v-if="cell.rowIndex === hoveredRow">
          <PencilIcon
            class="size-3 hover:text-gray-300 text-gray-400 z-50"
            @click.stop="editWebhook(cell.raw)"
          />
          <TrashIcon
            class="size-3 hover:text-gray-300 text-gray-400 z-50"
            @click.stop="deleteWebhook(cell.raw)"
          />
        </template>
        <ChevronRightIcon
          class="size-3 transition-all"
          :class="{
            'rotate-90': selectedItems.includes(cell.rowUuid),
          }"
        />
      </div>
    </template>
  </AppTableNext>
</template>
