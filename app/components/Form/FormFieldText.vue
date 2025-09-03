<script lang="ts" setup>
interface Props {
    modelValue: string | number;
    label?: string;
    name?: string;
    id?: string;
    type?: string;
    autocomplete?: string;
    placeholder?: string;
    ariaLabel: string;
    disabled?: boolean;
    size?: "sm" | "md";
}
const props = defineProps<Props>();

const randomId = useId();
const randomName = useId();

const model = useModel(props, "modelValue");
</script>

<template>
    <div>
        <label
            v-if="label"
            :for="id ?? randomId"
            class="block text-sm/6 font-medium text-gray-200"
            >{{ label }}</label
        >
        <div :class="{ 'mt-2': label }">
            <div class="flex flex-row space-x-2 items-center">
                <div
                    v-if="$slots.prefix"
                    class="absolute -mr-12 w-12 flex flex-row justify-center"
                >
                    <slot name="prefix" />
                </div>
                <input
                    v-model="model"
                    :aria-label="ariaLabel"
                    :type="type ?? 'text'"
                    :name="name ?? randomName"
                    :id="id ?? randomId"
                    :disabled="disabled"
                    :placeholder="placeholder ?? ''"
                    :autocomplete="autocomplete ?? 'off'"
                    class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                    :class="{
                        'pl-12': $slots.prefix,
                        'pr-12': $slots.suffix,
                        '!py-0.5': size === 'sm',
                        'opacity-50 cursor-not-allowed': disabled,
                    }"
                />
                <div
                    v-if="$slots.suffix"
                    class="-ml-14 w-12 flex flex-row justify-center"
                >
                    <slot name="suffix" />
                </div>
            </div>
        </div>
    </div>
</template>
