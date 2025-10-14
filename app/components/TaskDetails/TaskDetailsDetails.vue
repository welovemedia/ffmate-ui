<script lang="ts" setup>
import { default as humanizeDuration } from "humanize-duration"
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"

interface Props {
  task: Task
}

defineProps<Props>()
</script>

<template>
  <div class="w-full flex flex-col gap-y-4">
    <FormFieldText
      ariaLabel="started at"
      size="full"
      :disabled="true"
      label="Started at"
      :modelValue="
        task.startedAt ? new Date(task.startedAt).toUTCString() : '-'
      "
    ></FormFieldText>
    <FormFieldText
      ariaLabel="finished at"
      size="full"
      :disabled="true"
      label="Finished at"
      :modelValue="
        task.finishedAt ? new Date(task.finishedAt).toUTCString() : '-'
      "
    ></FormFieldText>
    <FormFieldText
      ariaLabel="duration"
      size="full"
      :disabled="true"
      label="Duration"
      :modelValue="
        task.startedAt && task.finishedAt
          ? humanizeDuration(task.finishedAt - task.startedAt, {
              units: ['h', 'm', 's'],
              round: true,
            })
          : '-'
      "
    ></FormFieldText>
    <FormFieldText
      ariaLabel="uuid"
      size="full"
      :disabled="true"
      label="UUID"
      :modelValue="task.uuid"
    ></FormFieldText>
  </div>
</template>
