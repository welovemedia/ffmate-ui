<script lang="ts" setup>
import { HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/vue/20/solid";
import type { Client } from "~/sdk/ffmate/lib/interfaces/client/client";

useCurrentPage().setCurrent("Clients");

const clientStore = useClientStore();

const selectedItems = ref<string[]>([]);

const clients = computed(() => {
    return clientStore.clients
        .map((c) => {
            return {
                ...c,
                online: Date.now() - c.lastSeen < 60_000,
            };
        })
        .sort((a, b) => {
            // self always first
            if (a.self !== b.self) {
                return a.self ? -1 : 1;
            }

            // online users next
            if (a.online !== b.online) {
                return a.online ? -1 : 1;
            }

            // natural, case-insensitive sort by identifier
            return a.identifier.localeCompare(b.identifier, undefined, {
                numeric: true,
                sensitivity: "accent",
            });
        });
});

const tableItems = computed(() => {
    return clients.value.map((t: Client & { online: boolean }) => {
        const cells = [
            {
                label: t.identifier,
                id: "identifier",
            },
            {
                label: t.version,
                id: "version",
            },
            {
                label: t.online,
                id: "online",
            },
            {
                label: useTimeAgo(new Date(t.lastSeen), {
                    showSecond: false,
                    updateInterval: 15_000,
                }).value,
                id: "lastSeen",
            },
        ];

        return {
            raw: t,
            uuid: t.identifier,
            cells: cells,
        };
    });
});
</script>

<template>
    <AppTableNext
        :headers="[
            { label: 'Identifier' },
            { label: 'Version' },
            { label: 'Online' },
            { label: 'Last seen', columnClass: 'w-50' },
        ]"
        :rows="tableItems"
        :selectAble="['click', 'single']"
        @update:select="selectedItems = $event"
    >
        <template #cell.label="{ cell, hoveredRow }">
            <span
                v-if="cell.id === 'identifier'"
                :class="{
                    'text-primary-500':
                        cell.raw.identifier ===
                        clientStore.selfClient?.identifier,
                }"
            >
                {{ cell.label }}
            </span>
            <span
                v-if="cell.id === 'online' && cell.raw.online"
                class="size-2 rounded-full bg-primary-400 opacity-75"
            ></span>
            <span
                v-if="cell.id === 'online' && !cell.raw.online"
                class="size-2 rounded-full bg-gray-300 opacity-75"
            ></span>
        </template>
        <template #row.after="{ row }">
            <div
                v-if="selectedItems.includes(row.uuid)"
                class="h-auto overflow-hidden transition-all"
            >
                <div
                    class="px-12 mb-2 bg-white/10 backdrop-blur-3xl -mt-2 rounded-b-lg w-[99%] mx-auto"
                >
                    <ClientDetails :client="row.raw" />
                </div>
            </div>
        </template>
    </AppTableNext>
</template>
