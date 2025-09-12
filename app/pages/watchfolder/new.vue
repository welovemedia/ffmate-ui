<script lang="ts" setup>
import type {
    NewWatchfolder,
    Watchfolder,
} from "~/sdk/ffmate/lib/interfaces/watchfolder/watchfolder";

const presetStore = usePresetStore();
const route = useRoute();

const editWatchfolder = ref<Watchfolder | null>(null);
const editWatchfolderId = route.query["edit"] as string;
useCurrentPage().setCurrent(
    editWatchfolderId ? "Edit watchfolder" : "New watchfolder",
);
if (editWatchfolderId) {
    await useFFMate()
        .Watchfolder.getWatchfolder(editWatchfolderId)
        .then((wf) => {
            editWatchfolder.value = wf;
        });
}

const form = reactive({
    name: editWatchfolder.value?.name ?? "",
    description: editWatchfolder.value?.description ?? "",
    path: editWatchfolder.value?.path ?? "",
    preset: editWatchfolder.value?.preset ?? presetStore.presets[0]?.uuid,
    interval: editWatchfolder.value?.interval ?? 5,
    growthChecks: editWatchfolder.value?.growthChecks ?? 3,
    suspended: editWatchfolder.value?.suspended ?? false,
    filterInclude:
        editWatchfolder.value?.filter?.extensions?.include?.join(",") ?? "",
    filterExclude:
        editWatchfolder.value?.filter?.extensions?.exclude?.join(",") ?? "",
});

const save = () => {
    const n = {
        name: form.name,
        description: form.description,
        interval: form.interval,
        growthChecks: form.growthChecks,
        preset: form.preset,
        path: form.path,
        suspended: form.suspended,
        filter: {
            extensions: {
                include: [],
                exclude: [],
            },
        },
    } as NewWatchfolder;
    if (form.filterInclude) {
        n.filter!.extensions!.include = form.filterInclude.split(",");
    }
    if (form.filterExclude) {
        n.filter!.extensions!.exclude = form.filterExclude.split(",");
    }

    if (editWatchfolder.value) {
        useFFMate()
            .Watchfolder.update(editWatchfolder.value.uuid, n)
            .then(() => {
                navigateTo({ name: "watchfolder" });
            });
    } else {
        useFFMate()
            .Watchfolder.create(n)
            .then(() => {
                navigateTo({ name: "watchfolder" });
            });
    }
};
</script>

<template>
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div class="px-4 sm:px-0">
            <h2 class="text-base/7 font-semibold text-gray-200">
                {{ editWatchfolderId ? "Edit" : "New" }} Watchfolder
            </h2>
            <p class="mt-1 text-sm/6 text-gray-400">
                {{
                    editWatchfolderId
                        ? "Edit watchfolder to automatically create new tasks"
                        : "Create a new watchfolder to automatically create new tasks"
                }}
            </p>
        </div>

        <form
            class="md:col-span-2 rounded-lg bg-white/2"
            @submit.prevent="save"
        >
            <div class="px-4 py-6 sm:p-8">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full">
                        <label
                            for="first-name"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Name *</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="form.name"
                                placeholder="Enter watchfolder name"
                                type="text"
                                name="name"
                                id="name"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label
                            for="about"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Description</label
                        >
                        <div class="mt-2">
                            <textarea
                                v-model="form.description"
                                placeholder="Enter watchfolder description"
                                name="about"
                                id="about"
                                rows="3"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-full">
                        <label
                            for="path"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Path *</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="form.path"
                                placeholder="Path to watch"
                                type="text"
                                name="path"
                                id="path"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-full">
                        <FormFieldSelect
                            id="preset"
                            name="preset"
                            label="Preset *"
                            :options="
                                Object.values(presetStore.presets).map((e) => ({
                                    label: e.name ?? 'unnamed',
                                    key: e.uuid,
                                }))
                            "
                            v-model="form.preset!"
                        />
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="first-name"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Interval (sec) *</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="form.interval"
                                type="number"
                                name="interval"
                                id="interval"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label
                            for="first-name"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Growth check *</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="form.growthChecks"
                                type="number"
                                name="growthCheck"
                                id="growthCheck"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="filter include"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Include extensions</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="form.filterInclude"
                                placeholder="Comma separated list of extensions"
                                type="text"
                                name="filter include"
                                id="filter include"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label
                            for="filter include"
                            class="block text-sm/6 font-medium text-gray-200"
                            >Exclude extensions</label
                        >
                        <div class="mt-2">
                            <input
                                v-model="form.filterExclude"
                                placeholder="Comma separated list of extensions"
                                type="text"
                                name="filter exclude"
                                id="filter exclude"
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-6">
                        <FormSwitch
                            label="Enabled"
                            :modelValue="!form.suspended"
                            @update:modelValue="form.suspended = !$event"
                        />
                    </div>
                </div>
            </div>
            <div
                class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
            >
                <button
                    type="button"
                    class="text-sm/6 font-semibold text-gray-200 cursor-pointer"
                    @click="navigateTo({ name: 'watchfolder' })"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
                >
                    {{ editWatchfolder ? "Update" : "Create" }}
                </button>
            </div>
        </form>
    </div>
</template>
