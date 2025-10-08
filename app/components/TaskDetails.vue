<script lang="ts" setup>
import { FolderIcon, InboxIcon } from "@heroicons/vue/24/outline";
import { default as humanizeDuration } from "humanize-duration";
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task";

interface Props {
    task: Task;
}

defineProps<Props>();
</script>

<template>
    <div class="pt-12">
        <div class="px-4 sm:px-0">
            <h3
                class="text-base/7 font-semibold text-white flex flex-row gap-x-2 items-center"
            >
                <FolderIcon
                    v-if="task.source === 'watchfolder'"
                    class="size-3"
                />
                <InboxIcon v-else class="size-3" />
                {{ task.name }}
            </h3>
            <p class="max-w-2xl text-sm/6 text-gray-400">
                created
                {{
                    useTimeAgo(new Date(task.createdAt), {
                        showSecond: true,
                        updateInterval: 1_000,
                    })
                }}
            </p>
        </div>
        <div class="mt-6 border-t border-white/10">
            <dl class="divide-y divide-white/10">
                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">UUID</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.uuid }}
                    </dd>
                </div>

                <div
                    v-if="task.batch"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm/6 font-medium text-white">Batch</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.batch }}
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Priority</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.priority }}
                    </dd>
                </div>

                <div
                    v-if="task.retries > 0"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm/6 font-medium text-white">Retry</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.retried }}/{{ task.retries }}
                    </dd>
                </div>

                <div
                    v-if="task.labels?.length"
                    lass="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm/6 font-medium text-white">Labels</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.labels?.join(", ") ?? "-" }}
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Status</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        <span
                            :class="{
                                'text-blue-400':
                                    task.status === 'RUNNING' ||
                                    task.status === 'PRE_PROCESSING' ||
                                    task.status === 'POST_PROCESSING',
                                'text-green-400':
                                    task.status === 'DONE_SUCCESSFUL',
                                'text-yellow-400':
                                    task.status === 'DONE_CANCELED',
                                'text-red-400': task.status === 'DONE_ERROR',
                            }"
                            >{{ task.status }}</span
                        >
                    </dd>
                </div>

                <div
                    v-if="task.error"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm/6 font-medium text-white">Error</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 break-all overflow-x-hidden"
                    >
                        <span class="text-red-500">{{ task.error }}</span>
                    </dd>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Progress</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        <div
                            class="bg-white rounded-xl shadow-sm overflow-hidden p-[.1rem]"
                        >
                            <div
                                class="relative h-4 flex items-center justify-center"
                            >
                                <div
                                    class="absolute top-0 bottom-0 left-0 rounded-lg transition-all duration-300 ease-in-out"
                                    :class="{
                                        'bg-blue-500/50':
                                            task.status === 'RUNNING' ||
                                            task.status === 'PRE_PROCESSING' ||
                                            task.status === 'POST_PROCESSING',
                                        'bg-green-400/50':
                                            task.status === 'DONE_SUCCESSFUL',
                                        'bg-red-400/50':
                                            task.status === 'DONE_ERROR',
                                        'bg-yellow-400/50':
                                            task.status === 'DONE_CANCELED',
                                    }"
                                    :style="`width:${task.progress}%`"
                                ></div>
                                <div
                                    class="relative text-gray-900 font-medium text-sm"
                                >
                                    {{ task.progress }}%
                                </div>
                            </div>
                        </div>
                    </dd>
                    <template v-if="task.startedAt && !task.finishedAt">
                        <dt class="text-sm/6 font-medium text-white ml-2"></dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            started
                            {{
                                useTimeAgo(new Date(task.startedAt), {
                                    showSecond: true,
                                    updateInterval: 1_000,
                                })
                            }}
                            <span
                                v-if="
                                    task.status === 'RUNNING' &&
                                    task.lastRemaining
                                "
                                >|
                                {{
                                    useTimeAgo(
                                        Date.now() + task.lastRemaining * 1000,
                                        {
                                            showSecond: true,
                                        },
                                    ).value.replaceAll("in ", "~")
                                }}
                                remaining</span
                            >
                        </dd>
                    </template>
                    <template v-else-if="task.startedAt && task.finishedAt">
                        <dt class="text-sm/6 font-medium text-white ml-2"></dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            finished
                            {{
                                useTimeAgo(new Date(task.finishedAt), {
                                    showSecond: true,
                                    updateInterval: 1_000,
                                })
                            }}
                            after
                            <span class="font-bold">{{
                                humanizeDuration(
                                    task.finishedAt - task.startedAt,
                                    {
                                        units: ["h", "m", "s"],
                                        round: true,
                                    },
                                )
                            }}</span>
                        </dd>
                    </template>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Command</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.command.raw }}
                    </dd>
                    <template v-if="task.command.resolved">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Resolved
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.command.resolved }}
                        </dd>
                    </template>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Input</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.inputFile.raw }}
                    </dd>
                    <template v-if="task.inputFile.resolved">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Resolved
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.inputFile.resolved }}
                        </dd>
                    </template>
                </div>

                <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt class="text-sm/6 font-medium text-white">Output</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.outputFile.raw }}
                    </dd>
                    <template v-if="task.outputFile.resolved">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Resolved
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.outputFile.resolved }}
                        </dd>
                    </template>
                </div>

                <div
                    v-if="task.preProcessing"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm font-medium text-white">
                        PreProcessing
                    </dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        <template
                            v-if="
                                task.preProcessing.startedAt &&
                                !task.preProcessing.finishedAt
                            "
                        >
                            <dt
                                class="text-sm/6 font-medium text-white ml-2"
                            ></dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                started
                                {{
                                    useTimeAgo(
                                        new Date(task.preProcessing.startedAt),
                                        {
                                            showSecond: true,
                                            updateInterval: 1_000,
                                        },
                                    )
                                }}
                            </dd>
                        </template>
                        <template
                            v-if="
                                task.preProcessing.startedAt &&
                                task.preProcessing.finishedAt
                            "
                        >
                            <dt
                                class="text-sm/6 font-medium text-white ml-2"
                            ></dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                finished
                                {{
                                    useTimeAgo(
                                        new Date(task.preProcessing.finishedAt),
                                        {
                                            showSecond: true,
                                            updateInterval: 1_000,
                                        },
                                    )
                                }}
                                after
                                <span class="font-bold">{{
                                    humanizeDuration(
                                        task.preProcessing.finishedAt -
                                            task.preProcessing.startedAt,
                                        {
                                            units: ["h", "m", "s"],
                                            round: true,
                                        },
                                    )
                                }}</span>
                            </dd>
                        </template>
                    </dd>
                    <template v-if="task.preProcessing.error">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Error
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            <span class="text-red-500">{{
                                task.preProcessing.error
                            }}</span>
                        </dd>
                    </template>
                    <template v-if="task.preProcessing?.scriptPath?.raw">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Script path
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.preProcessing.scriptPath.raw }}
                        </dd>
                        <template
                            v-if="task.preProcessing?.scriptPath?.resolved"
                        >
                            <dt class="text-sm/6 font-medium text-white ml-4">
                                Resolved
                            </dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                {{ task.preProcessing.scriptPath.resolved }}
                            </dd>
                        </template>
                    </template>
                    <template v-if="task.preProcessing?.sidecarPath?.raw">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Sidecar path
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.preProcessing.sidecarPath.raw }}
                        </dd>
                        <template
                            v-if="task.preProcessing?.sidecarPath?.resolved"
                        >
                            <dt class="text-sm/6 font-medium text-white ml-4">
                                Resolved
                            </dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                {{ task.preProcessing.sidecarPath.resolved }}
                            </dd>
                        </template>
                    </template>
                </div>

                <div
                    v-if="task.postProcessing"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm font-medium text-white">
                        PostProcessing
                    </dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        <template
                            v-if="
                                task.postProcessing.startedAt &&
                                !task.postProcessing.finishedAt
                            "
                        >
                            <dt
                                class="text-sm/6 font-medium text-white ml-2"
                            ></dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                started
                                {{
                                    useTimeAgo(
                                        new Date(task.postProcessing.startedAt),
                                        {
                                            showSecond: true,
                                            updateInterval: 1_000,
                                        },
                                    )
                                }}
                            </dd>
                        </template>
                        <template
                            v-if="
                                task.postProcessing.startedAt &&
                                task.postProcessing.finishedAt
                            "
                        >
                            <dt
                                class="text-sm/6 font-medium text-white ml-2"
                            ></dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                finished
                                {{
                                    useTimeAgo(
                                        new Date(
                                            task.postProcessing.finishedAt,
                                        ),
                                        {
                                            showSecond: true,
                                            updateInterval: 1_000,
                                        },
                                    )
                                }}
                                after
                                <span class="font-bold">{{
                                    humanizeDuration(
                                        task.postProcessing.finishedAt -
                                            task.postProcessing.startedAt,
                                        {
                                            units: ["h", "m", "s"],
                                            round: true,
                                        },
                                    )
                                }}</span>
                            </dd>
                        </template>
                    </dd>
                    <template v-if="task.postProcessing.error">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Error
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            <span class="text-red-500">{{
                                task.postProcessing.error
                            }}</span>
                        </dd>
                    </template>
                    <template v-if="task.postProcessing?.scriptPath?.raw">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Script path
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.postProcessing.scriptPath.raw }}
                        </dd>
                        <template
                            v-if="task.postProcessing?.scriptPath?.resolved"
                        >
                            <dt class="text-sm/6 font-medium text-white ml-4">
                                Resolved
                            </dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                {{ task.postProcessing.scriptPath.resolved }}
                            </dd>
                        </template>
                    </template>
                    <template v-if="task.postProcessing?.sidecarPath?.raw">
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            Sidecar path
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ task.postProcessing.sidecarPath.raw }}
                        </dd>
                        <template
                            v-if="task.postProcessing?.sidecarPath?.resolved"
                        >
                            <dt class="text-sm/6 font-medium text-white ml-4">
                                Resolved
                            </dt>
                            <dd
                                class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                            >
                                {{ task.postProcessing.sidecarPath.resolved }}
                            </dd>
                        </template>
                    </template>
                </div>
                <div
                    v-if="task.webhooks?.length"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm font-medium text-white">Webhooks</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    ></dd>

                    <template
                        v-for="(webhook, index) in task.webhooks"
                        :key="index"
                    >
                        <dt class="text-sm/6 font-medium text-white ml-2">
                            {{ webhook.event }}
                        </dt>
                        <dd
                            class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                        >
                            {{ webhook.url }}
                        </dd>
                    </template>
                </div>
                <div
                    v-if="task.client"
                    class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                    <dt class="text-sm/6 font-medium text-white">Client</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    ></dd>
                    <dt class="text-sm/6 font-medium text-white ml-2">Name</dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        {{ task.client?.identifier ?? "n/a" }}
                    </dd>
                    <dt class="text-sm/6 font-medium text-white ml-2">
                        Details
                    </dt>
                    <dd
                        class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0"
                    >
                        Version: {{ task.client?.version ?? "n/a" }} | OS:
                        {{ task.client?.os ?? "n/a" }} | Arch:
                        {{ task.client?.arch ?? "n/a" }}
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>
