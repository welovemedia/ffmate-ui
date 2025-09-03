<script lang="ts" setup>
interface Props {
    tabs: {
        label: string;
        id: string;
    }[];
}
const props = defineProps<Props>();

const active = ref<string>(props.tabs[0]?.id ?? "");
</script>

<template>
    <div>
        <ul class="flex items-center gap-x-2 border-b border-white/10 w-full">
            <li
                v-for="tab in tabs"
                :key="tab.id"
                class="cursor-pointer px-3 py-1 border-b-1 border-transparent -mb-[1px]"
                :class="{
                    'font-semibold !border-primary-500': active === tab.id,
                }"
                @click="active = tab.id"
            >
                {{ tab.label }}
            </li>
        </ul>

        <div>
            <template v-for="tab in tabs" :key="tab.id">
                <div :class="{ hidden: active !== tab.id }">
                    <slot :name="'content:' + tab.id" />
                </div>
            </template>
        </div>
    </div>
</template>
