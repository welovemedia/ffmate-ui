<script lang="ts" setup>
import { ChevronRightIcon } from "@heroicons/vue/24/solid";
import type { WebhookExecution } from "~/sdk/ffmate/lib/interfaces/webhooks/webhook";

const webhookExecutionStore = useWebhookExecutionStore();
const { perPage } = useConfig();
const page = ref(0);

useCurrentPage().setCurrent("Sent webhooks");

watch(page, () => {
    webhookExecutionStore.load(page.value, perPage);
});

const selectedItems = ref<string[]>([]);

const webhookExecutions = computed(() => {
    return webhookExecutionStore.executions;
});

const tableItems = computed(() => {
    return webhookExecutions.value.map((t: WebhookExecution) => {
        const cells = [
            {
                label: "POST",
                id: "method",
            },
            {
                label: t.response.status,
                id: "status",
            },
            {
                label: t.event,
                id: "event",
            },
            {
                id: "url",
            },
            {
                label: useTimeAgo(new Date(t.createdAt)).value,
                id: "createdAt",
            },
            { label: "", id: "chevron" },
        ];

        return {
            raw: t,
            uuid: t.uuid,
            cells: cells,
        };
    });
});
</script>

<template>
    <AppTableNext
        :headers="[
            { label: 'Method', columnClass: 'w-20' },
            { label: 'Status', columnClass: 'w-20' },
            { label: 'Event', columnClass: 'w-60' },
            { label: 'URL' },
            { label: 'Executed at' },
            { label: 'pagination', columnClass: 'w-16' },
        ]"
        :rows="tableItems"
        :selectAble="['click', 'single']"
        @update:select="selectedItems = $event"
    >
        <template #header.label="{ header }">
            <Pagination
                v-if="header.label === 'pagination'"
                :page="page"
                :perPage="perPage"
                :total="webhookExecutionStore.total"
                @next="page++"
                @previous="page--"
            />
        </template>
        <template #cell.label="{ cell, hoveredRow }">
            <span v-if="cell.id === 'url'" class="line-clamp-1 break-words">{{
                cell.raw.url
            }}</span>
            <span
                v-if="cell.id === 'status'"
                :class="{
                    'text-primary-300': cell.raw.response.status < 400,
                    'text-red-500': cell.raw.response.status >= 400,
                }"
            >
                {{ cell.raw.response.status }}
            </span>
            <div
                v-if="cell.id === 'chevron'"
                class="flex flex-row space-x-2 justify-end w-full"
            >
                <ChevronRightIcon
                    class="size-3 transition-all"
                    :class="{
                        'rotate-90': selectedItems.includes(cell.rowUuid),
                    }"
                />
            </div>
        </template>
        <template #row.after="{ row }">
            <div
                v-if="selectedItems.includes(row.uuid)"
                class="h-auto overflow-hidden transition-all"
            >
                <div
                    class="px-12 mb-2 bg-white/10 backdrop-blur-3xl -mt-2 rounded-b-lg w-[99%] mx-auto"
                >
                    <WebhookExecutionDetails
                        :webhookExecution="row.raw"
                        :key="row.raw.uuid"
                    />
                </div>
            </div>
        </template>
    </AppTableNext>
</template>
