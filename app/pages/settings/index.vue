<script lang="ts" setup>
useCurrentPage().setCurrent("Settings");

const settingsStore = useSettingsStore();
</script>

<template>
    <Tabs
        :tabs="[
            {
                id: 'ai',
                label: 'AI',
            },
        ]"
    >
        <template v-if="settingsStore.hasLoaded" #content:ai>
            <SettingsAI />
        </template>
    </Tabs>
</template>
