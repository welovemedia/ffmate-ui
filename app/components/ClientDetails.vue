<script lang="ts" setup>
import type { Client } from "~/sdk/ffmate/lib/interfaces/client/client";

interface Props {
    client: Client;
}

defineProps<Props>();
</script>

<template>
    <div class="pt-12">
        <div class="px-4 sm:px-0">
            <h3 class="text-base/7 font-semibold text-white">
                {{ client.identifier }}
            </h3>
            <p class="max-w-2xl text-sm/6 text-gray-400">
                last seen {{ useTimeAgo(new Date(client.lastSeen)) }}
            </p>
        </div>
        <div class="mt-6 border-t border-white/10">
            <dl class="divide-y divide-white/10">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Version</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ client.version }}
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">FFmpeg</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ client.ffmpeg }}
                    </dd>
                </div>

                <div
                    v-if="client.labels?.length"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm/6 font-medium text-white">Labels</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ client.labels?.join(", ") }}
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">OS</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ client.os }}
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Arch</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ client.arch }}
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">
                        Max concurrent tasks
                    </dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ client.maxConcurrentTasks }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>
