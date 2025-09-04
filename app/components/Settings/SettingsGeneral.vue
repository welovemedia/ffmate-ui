<script lang="ts" setup>
useCurrentPage().setCurrent("Settings");

const settingsStore = useSettingsStore();
const form = reactive({
    port: settingsStore.settings.general?.port || 0,
    database: settingsStore.settings.general?.database || "",
    ffmpeg: settingsStore.settings.general?.ffmpeg || "",
    maxConcurrentTasks: settingsStore.settings.general?.maxConcurrentTasks || 0,
    loglevel: settingsStore.settings.general?.loglevel || "info",
    debug: settingsStore.settings.general?.debug || "",
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
                <FormFieldText
                    v-model="form.maxConcurrentTasks"
                    label="Max concurrent tasks"
                    :disabled="true"
                    type="number"
                    ariaLabel="max concurrent tasks"
                />
                <FormFieldText
                    v-model="form.loglevel"
                    label="Loglevel"
                    :disabled="true"
                    type="text"
                    ariaLabel="loglevel"
                />
                <FormFieldText
                    v-model="form.debug"
                    label="Debug"
                    :disabled="true"
                    type="text"
                    ariaLabel="debug"
                />
            </form>
        </template>
    </Setting>
</template>
