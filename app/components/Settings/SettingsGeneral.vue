<script lang="ts" setup>
useCurrentPage().setCurrent("Settings");

const settingsStore = useSettingsStore();
const form = reactive({
    port: settingsStore.settings.general?.port || 0,
    database: settingsStore.settings.general?.database || "",
    ffmpeg: settingsStore.settings.general?.ffmpeg || "",
});
</script>

<template>
    <Setting
        description="General readonly settings of the current FFmate process"
    >
        <template #default>
            <form class="flex flex-col gap-y-4">
                <FormFieldText
                    v-model="form.port"
                    label="Port"
                    :disabled="true"
                    type="text"
                    ariaLabel="port"
                />
                <FormFieldText
                    v-model="form.database"
                    label="Database"
                    :disabled="true"
                    type="text"
                    ariaLabel="database"
                />
                <FormFieldText
                    v-model="form.ffmpeg"
                    label="FFmpeg"
                    :disabled="true"
                    type="text"
                    ariaLabel="ffmpeg"
                />
            </form>
        </template>
    </Setting>
</template>
