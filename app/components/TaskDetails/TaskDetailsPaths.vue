<script lang="ts" setup>
import type { Task } from "~/sdk/ffmate/lib/interfaces/tasks/task"

interface Props {
  task: Task
}

defineProps<Props>()
</script>

<template>
  <div class="w-full flex flex-col gap-y-4">
    <FormFieldText
      ariaLabel="input file"
      size="full"
      :disabled="true"
      label="Input file"
      :modelValue="task.inputFile.resolved ?? task.inputFile.raw"
    ></FormFieldText>
    <FormFieldText
      ariaLabel="output file"
      size="full"
      :disabled="true"
      label="Output file"
      :modelValue="task.outputFile.resolved ?? task.outputFile.raw"
    ></FormFieldText>
    <FormFieldText
      v-if="task.preProcessing?.scriptPath"
      ariaLabel="pre processing script file"
      size="full"
      :disabled="true"
      label="Pre processing Script"
      :modelValue="
        task.preProcessing.scriptPath.resolved ??
        task.preProcessing.scriptPath.raw
      "
    ></FormFieldText>
    <FormFieldText
      v-if="task.preProcessing?.sidecarPath"
      ariaLabel="pre processing sidecar file"
      size="full"
      :disabled="true"
      label="Pre processing SideCar"
      :modelValue="
        task.preProcessing.sidecarPath.resolved ??
        task.preProcessing.sidecarPath.raw
      "
    ></FormFieldText>
  </div>
</template>
