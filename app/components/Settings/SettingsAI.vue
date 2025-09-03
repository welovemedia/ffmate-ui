<script lang="ts" setup>
useCurrentPage().setCurrent("Settings");

const settingsStore = useSettingsStore();
const form = reactive({
    apiKey: settingsStore.settings.ai?.apiKey || "",
    model: settingsStore.settings.ai?.model || "gpt-4",
});
</script>

<template>
    <Setting description="Setup AI to be used throughout ffmate">
        <template #default>
            <form class="flex flex-col gap-y-4">
                <FormFieldText
                    v-model="form.apiKey"
                    label="API Key *"
                    type="text"
                    placeholder="sk-xxxx"
                    ariaLabel="open ai apiKey"
                />
                <FormFieldSelect
                    v-model="form.model"
                    label="Model *"
                    :options="[
                        { key: 'gpt-4', label: 'GPT-4' },
                        { key: 'sonnet-3.7', label: 'Sonnect 3.7' },
                        { key: 'claude-2', label: 'Claude 2' },
                    ]"
                />
                <div class="flex justify-between">
                    <Button
                        type="cancel"
                        @click="
                            () => {
                                form.apiKey =
                                    settingsStore.settings.ai?.apiKey || '';
                                form.model =
                                    settingsStore.settings.ai?.model || 'gpt-4';
                            }
                        "
                        >Discard</Button
                    >
                    <Button
                        @click="
                            () => {
                                settingsStore
                                    .setSettings({
                                        ai: {
                                            apiKey: form.apiKey,
                                            model: form.model,
                                        },
                                    })
                                    .save();
                            }
                        "
                        >Save</Button
                    >
                </div>
            </form>
        </template>
    </Setting>
</template>
