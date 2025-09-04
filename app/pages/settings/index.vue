<script lang="ts" setup>
useCurrentPage().setCurrent("Settings");

const settingsStore = useSettingsStore();
</script>

<template>
    <div>
        <Tabs
            v-if="settingsStore.hasLoaded"
            :tabs="[
                {
                    id: 'general',
                    label: 'General',
                },
            ]"
        >
            <template #content:general>
                <SettingsGeneral />
            </template>
        </Tabs>
    </div>
</template>
