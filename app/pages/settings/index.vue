<script lang="ts" setup>
useCurrentPage().setCurrent("Settings");

const settingsStore = useSettingsStore();
</script>

<template>
    <Tabs
        v-if="settingsStore.hasLoaded"
        :tabs="[
            {
                id: 'general',
                label: 'General',
            },
            {
                id: 'ai',
                label: 'AI',
            },
        ]"
    >
        <template #content:general>
            <SettingsGeneral />
        </template>
        <template #content:ai>
            <SettingsAI />
        </template>
    </Tabs>
</template>
