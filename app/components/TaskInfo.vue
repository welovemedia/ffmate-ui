<script lang="ts" setup>
import { ServerStackIcon } from '@heroicons/vue/24/outline';
import { ArrowUpTrayIcon, ChartBarIcon } from '@heroicons/vue/24/solid';
import type { Task } from '~/sdk/ffmate/lib/interfaces/tasks/task';

interface Props {
    task: Task;
}

defineProps<Props>();
</script>
<template>
    <div class="flex items-start gap-x-4 w-full">
        <div
            class="h-17 w-30 rounded-lg"
            :class="{
                'bg-yellow-300': task.status == 'QUEUED',
                'bg-blue-300': task.status == 'RUNNING',
                'bg-gray-300': task.status == 'DONE_CANCELED',
                'bg-primary-300': task.status == 'DONE_SUCCESSFUL',
                'bg-red-300': task.status == 'DONE_ERROR',
            }"
        ></div>
        <div class="flex flex-col justify-between items-start min-w-96 grow h-24">
            <span>{{ task.name }}</span>
            <Progress
                :status="task.status"
                :progress="task.progress"
                :eta="
                    task.status === 'RUNNING' && task.lastRemaining
                        ? useTimeAgo(Date.now() + task.lastRemaining * 1000, {
                              showSecond: true,
                          }).value.replaceAll('in ', '')
                        : undefined
                "
            />
            <div class="flex items-center gap-x-6 text-xs">
                <span class="flex gap-x-1 items-center"
                    ><ArrowUpTrayIcon class="size-3" />{{ task.source }}
                </span>
                <span class="flex gap-x-1 items-center"
                    ><ChartBarIcon class="size-3" />{{ task.priority }}
                </span>
                <span class="flex gap-x-1 items-center text-orange-400"
                    ><ServerStackIcon class="size-3" />{{
                        task.client?.identifier
                    }}
                </span>
            </div>
        </div>
    </div>
</template>
