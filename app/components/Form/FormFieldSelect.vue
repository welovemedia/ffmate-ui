<script lang="ts" setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";

export type Option = { label: string; key: string };
interface Props {
    id?: string;
    name?: string;
    label?: string;
    options: Option[];
    modelValue: string; //key
    size?: "xs";
}
const props = defineProps<Props>();

const emit = defineEmits(["update:modelValue"]);
const value = ref(props.modelValue);
watch(value, () => {
    emit("update:modelValue", value.value);
});
</script>
<template>
    <div>
        <label
            v-if="label"
            for="location"
            class="block text-sm/6 font-medium text-white"
            >{{ label }}</label
        >
        <div class="mt-2 grid grid-cols-1">
            <select
                :id="id ?? useId()"
                :name="name ?? useId()"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white/10 py-1.25 pl-3 pr-8 text-base text-gray-300 outline-1 outline-gray-600 -outline-offset- focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                :class="{ '!py-0': size && size === 'xs' }"
                v-model="value"
            >
                >
                <option v-for="(entry, _) in options" :value="entry.key">
                    {{ entry.label }}
                </option>
            </select>
            <ChevronDownIcon
                class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                aria-hidden="true"
            />
        </div>
    </div>
</template>
