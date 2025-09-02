<script lang="ts" setup>
interface Props {
  tabs: {
    label: string
    id: string
  }[]
}
const props = defineProps<Props>()

const active = ref<string>(props.tabs[0].id)
</script>

<template>
  <ul class="flex items-center gap-x-2">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      @click="active = tab.id"
      class="cursor-pointer px-3 py-1 rounded-md"
      :class="{ 'text-primary-300': active === tab.id }"
    >
      {{ tab.label }}
    </li>
  </ul>

  <div>
    <template v-for="tab in tabs" :key="tab.id">
      <div :class="{ hidden: active !== tab.id }">
        <slot :name="'content.' + tab.id" />
      </div>
    </template>
  </div>
</template>
