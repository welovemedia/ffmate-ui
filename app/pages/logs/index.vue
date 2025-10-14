<script lang="ts" setup>
useSetCurrentPage().setCurrent(PageTitles.Logs);

const logStore = useLogStore();

const tableItems = computed(() => {
    return logStore.logs.map((t: string) => {
        const cells = [
            {
                label: t,
                id: "log",
            },
        ];

        return {
            raw: t,
            uuid: t,
            cells: cells,
        };
    });
});
</script>

<template>
    <AppTableNext
        :headers="[{ label: 'Log' }]"
        rowClass="max-h-6"
        :rows="tableItems"
    />
</template>
