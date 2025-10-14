<script lang="ts" setup>
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"

interface Props {
    task: Task;
}

defineProps<Props>();
const emit = defineEmits(["close"]);
</script>

<template>
    <Card>
        <div
            class="flex flex-col items-start gap-y-4 w-[75vw] max-h-[75vh] relative text-xs text-gray-100"
        >
            <XMarkIcon
                class="size-4 absolute right-0 top-0 text-gray-400 hover:text-gray-300 cursor-pointer"
                @click="emit('close')"
            />
            <TaskInfo :task />
            <Divider />
            <TaskDetails :task />
        </div>
    </Card>
</template>
