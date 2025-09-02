<script lang="ts" setup>
interface Props {
    modelValue: string | number;
    label?: string;
    name?: string;
    id?: string;
    preventEnter?: boolean;
    autocomplete?: string;
    placeholder?: string;
    ariaLabel: string;
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
                <textarea
                    v-model="model"
                    :aria-label="ariaLabel"
                    :name="name ?? randomName"
                    :id="id ?? randomId"
                    :placeholder="placeholder ?? ''"
                    :autocomplete="autocomplete ?? 'off'"
                    class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-2 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                    @keypress="
                        (event: KeyboardEvent) => {
                            if (preventEnter && event.key === 'Enter') {
                                event.preventDefault();
                            }
                        }
                    "
                    >{{ model }}</textarea
                >
            </div>
        </div>
    </div>
</template>
