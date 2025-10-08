<script lang="ts" setup>
import {
    ArrowUpIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/vue/24/solid";
import type {
    NewPreset,
    Preset,
} from "~/sdk/ffmate/lib/interfaces/presets/preset";
import {
    WebhookEvent,
    type NewWebhook,
} from "~/sdk/ffmate/lib/interfaces/webhooks/webhook";

const route = useRoute();

const editPreset = ref<Preset | null>(null);
const editPresetId = route.query["edit"] as string;
useCurrentPage().setCurrent(editPresetId ? "Edit preset" : "New preset");
const clientStore = await useClientStore();

if (editPresetId) {
    await useFFMate()
        .Preset.getPreset(editPresetId)
        .then((preset) => {
            editPreset.value = preset;
        });
}

const globalPreset = await useFFMate().Preset.getGlobalPresets();
const globalPresetFiltered = computed(() => {
    return globalPreset.filter((p) => {
        const s = search.value.toLowerCase();
        const t = [
            p.name,
            p.description,
            p.command,
            p.priority?.toString(),
            p.preProcessing?.scriptPath,
            p.preProcessing?.scriptPath,
            p.postProcessing?.scriptPath,
            p.postProcessing?.scriptPath,
        ];

        return t.some((v) => v?.toLowerCase().includes(s));
    });
});

const search = ref("");

const form = reactive({
    name: editPreset.value?.name ?? "",
    description: editPreset.value?.description ?? "",
    command: editPreset.value?.command ?? "",
    priority: editPreset.value?.priority ?? 0,
    outputFile: editPreset.value?.outputFile ?? "",
    retries: editPreset.value?.retries ?? 0,
    preProcessing: {
        scriptPath: editPreset.value?.preProcessing?.scriptPath ?? "",
        sidecarPath: editPreset.value?.preProcessing?.sidecarPath ?? "",
        importSidecar: editPreset.value?.preProcessing?.importSidecar ?? false,
    },
    postProcessing: {
        scriptPath: editPreset.value?.postProcessing?.scriptPath ?? "",
        sidecarPath: editPreset.value?.postProcessing?.sidecarPath ?? "",
    },
    webhooks: editPreset.value?.webhooks ?? ([] as NewWebhook[]),
    labels: editPreset.value?.labels ?? ([] as string[]),
    globalPresetName: "",
});

const applyPreset = (preset: NewPreset) => {
    form.name = preset.name;
    form.description = preset.description;
    form.command = preset.command;
    form.priority = preset.priority ?? 0;
    if (preset.outputFile) {
        form.outputFile =
            clientStore.selfClient?.os === "windows"
                ? preset.outputFile.replaceAll(/\//g, "\\") // Normalize Windows paths
                : preset.outputFile;
    }
    form.preProcessing.scriptPath = preset.preProcessing?.scriptPath ?? "";
    form.preProcessing.sidecarPath = preset.preProcessing?.sidecarPath ?? "";
    form.preProcessing.importSidecar =
        preset.preProcessing?.importSidecar ?? false;
    form.postProcessing.scriptPath = preset.postProcessing?.scriptPath ?? "";
    form.postProcessing.sidecarPath = preset.postProcessing?.sidecarPath ?? "";
    form.globalPresetName = preset.name;
};

const save = () => {
    const n = {
        name: form.name,
        description: form.description,
        command: form.command,
        priority:
            typeof form.priority === "string"
                ? parseInt(form.priority)
                : form.priority,
        retries:
            typeof form.retries === "string"
                ? parseInt(form.retries)
                : form.retries,
        outputFile: form.outputFile,
        preProcessing: {
            scriptPath: form.preProcessing.scriptPath,
            sidecarPath: form.preProcessing.sidecarPath,
            importSidecar: form.preProcessing.importSidecar,
        },
        postProcessing: {
            scriptPath: form.postProcessing.scriptPath,
            sidecarPath: form.postProcessing.sidecarPath,
        },
        webhooks: form.webhooks,
        labels: form.labels.filter(l => l.length),
        globalPresetName: form.globalPresetName,
    } as NewPreset;

    if (editPreset.value) {
        useFFMate()
            .Preset.update(editPreset.value.uuid, n)
            .then(() => {
                navigateTo({ name: "presets" });
            });
    } else {
        useFFMate()
            .Preset.create(n)
            .then(() => {
                navigateTo({ name: "presets" });
            });
    }
};
</script>

<template>
    <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div class="px-4 sm:px-0 flex flex-col space-y-2">
            <div class="flex flex-col">
                <h2 class="text-base/7 font-semibold text-gray-200">
                    {{ editPresetId ? "Edit" : "New" }} Preset
                </h2>
                <p class="text-sm/6 text-gray-400">
                    {{
                        editPresetId
                            ? "Edit preset to use in your watchfolder"
                            : "Create a new preset to use in your watchfolder"
                    }}
                </p>
            </div>
            <hr class="border-primary-500" />
            <div class="flex flex-row justify-between items-center">
                <span class="text-gray-400 text-sm/6"
                    >Or start off with a global preset:</span
                >
                <div class="w-32">
                    <FormFieldText
                        v-model="search"
                        placeholder="Search"
                        ariaLabel="preset search"
                        size="sm"
                    />
                </div>
            </div>
            <ul class="flex flex-col text-sm/6 text-gray-300">
                <template
                    v-for="(preset, i) in globalPresetFiltered"
                    :key="preset.name"
                >
                    <li
                        class="py-2 flex flex-row gap-x-2 items-center justify-between hover:bg-white/10 rounded-lg px-2 transition-all cursor-pointer group"
                        @click="applyPreset(preset)"
                    >
                        <div class="flex flex-row space-x-2 items-center">
                            <PlusCircleIcon class="size-4 text-primary-400" />
                            <div class="flex flex-col space-y-0">
                                <span class="line-clamp-1">{{
                                    preset.name
                                }}</span>
                                <p class="text-xs text-gray-400 line-clamp-1">
                                    {{ preset.description }}
                                </p>
                            </div>
                        </div>
                        <div class="rotate-90 pt-2 flex flex-row items-center">
                            <ArrowUpIcon
                                class="size-4 opacity-0 group-hover:opacity-100 text-primary-400 animate-bounce transition-all"
                            />
                        </div>
                    </li>
                    <li
                        v-if="i !== globalPresetFiltered.length - 1"
                        class="h-0 border-t border-gray-700"
                    ></li>
                </template>
            </ul>
        </div>

        <form
            class="md:col-span-2 rounded-lg bg-white/2"
            @submit.prevent="save"
        >
            <div class="px-4 py-6 sm:p-8">
                <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-full">
                        <FormFieldText
                            v-model="form.name"
                            label="Name *"
                            placeholder="Enter watchfolder name"
                            name="name"
                            id="name"
                            ariaLabel="preset name"
                        />
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
                                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-full">
                        <FormFieldTextarea
                            v-model="form.command"
                            label="Command *"
                            placeholder="Enter command"
                            preventEnter
                            autoHeight
                            name="command"
                            id="command"
                            ariaLabel="preset command"
                        />
                    </div>

                    <div class="sm:col-span-full">
                        <FormFieldText
                            v-model="form.outputFile"
                            label="Output file *"
                            placeholder="Enter output file"
                            name="output"
                            id="output"
                            ariaLabel="preset output"
                        />
                    </div>

                    <div class="sm:col-span-3">
                        <FormFieldText
                            v-model="form.priority"
                            label="Priority"
                            placeholder="Enter priority"
                            name="priority"
                            type="number"
                            id="priority"
                            ariaLabel="preset priority"
                        />
                    </div>
                    <div class="sm:col-span-3">
                        <FormFieldText
                            v-model="form.retries"
                            label="Retries"
                            placeholder="Enter retries"
                            name="retries"
                            type="number"
                            id="retries"
                            ariaLabel="preset retries"
                        />
                    </div>

                    <div class="sm:col-span-3">
                        <FormFieldText
                            v-model="form.preProcessing.sidecarPath"
                            label="PreProcessing sidecarPath"
                            placeholder="Sidecar path"
                            ariaLabel="preset preProcessing sidecarPath"
                        />
                    </div>
                    <div class="sm:col-span-3">
                        <FormFieldText
                            v-model="form.preProcessing.scriptPath"
                            label="PreProcessing scriptPath"
                            placeholder="Script path"
                            ariaLabel="preset preProcessing scriptPath"
                        />
                    </div>
                    <div class="sm:col-span-6 text-right">
                        <FormSwitch
                            label="Import sidecar"
                            :modelValue="form.preProcessing.importSidecar"
                            @update:modelValue="
                                (e: boolean) => {
                                    console.log('yo', e);
                                    form.preProcessing.importSidecar = e;
                                }
                            "
                        />
                    </div>

                    <div class="sm:col-span-3">
                        <FormFieldText
                            v-model="form.postProcessing.sidecarPath"
                            label="PostProcessing sidecarPath"
                            placeholder="Sidecar path"
                            ariaLabel="preset PostProcessing sidecarPath"
                        />
                    </div>
                    <div class="sm:col-span-3">
                        <FormFieldText
                            v-model="form.postProcessing.scriptPath"
                            label="PostProcessing scriptPath"
                            placeholder="Script path"
                            ariaLabel="preset postProcessing scriptPath"
                        />
                    </div>

                    <Divider class="col-span-full" />

                    <div class="sm:col-span-full">
                        <h4 class="text-sm">Labels</h4>
                        <ul class="flex flex-col gap-y-6">
                            <li
                                v-for="(_, index) in form.labels"
                                :key="index"
                                class="flex gap-x-6 justify-between w-full"
                            >
                                <div class="w-full flex gap-x-2 items-end">
                                    <FormFieldText
                                        v-model="form.labels[index]!"
                                        label="Label"
                                        class="w-full"
                                        :maxLength="32"
                                        placeholder="Label"
                                        ariaLabel="label"
                                    />
                                    <TrashIcon
                                        class="size-4 mb-3 text-gray-400 hover:text-gray-300 cursor-pointer"
                                        @click="form.labels.splice(index, 1)"
                                    />
                                </div>
                            </li>
                        </ul>
                        <Button
                            class="w-full mt-4"
                            @click.stop="form.labels.push('')"
                            >+ Label</Button
                        >
                    </div>

                    <Divider class="col-span-full" />

                    <div class="sm:col-span-full">
                        <h4 class="text-sm">Webhooks</h4>
                        <ul class="flex flex-col gap-y-6">
                            <li
                                v-for="(webhook, index) in form.webhooks"
                                :key="index"
                                class="flex gap-x-6 justify-between w-full"
                            >
                                <div class="w-1/2">
                                    <div class="sm:col-span-full">
                                        <FormFieldSelect
                                            label="Event *"
                                            :options="
                                                Object.values(WebhookEvent)
                                                    .filter(
                                                        (w) =>
                                                            w.startsWith(
                                                                'preset.',
                                                            ) ||
                                                            w.startsWith(
                                                                'task.',
                                                            ),
                                                    )
                                                    .map((e) => ({
                                                        label: e,
                                                        key: e,
                                                    }))
                                            "
                                            v-model="webhook.event"
                                        />
                                    </div>
                                </div>
                                <div class="w-1/2 flex gap-x-2 items-end">
                                    <FormFieldText
                                        v-model="form.webhooks[index]!.url"
                                        label="Url"
                                        class="w-full"
                                        placeholder="Url"
                                        ariaLabel="webhook url"
                                    />
                                    <TrashIcon
                                        class="size-4 mb-3 text-gray-400 hover:text-gray-300 cursor-pointer"
                                        @click="form.webhooks.splice(index, 1)"
                                    />
                                </div>
                            </li>
                        </ul>
                        <Button
                            class="w-full mt-4"
                            @click.stop="
                                form.webhooks.push({
                                    event: WebhookEvent.TASK_CREATED,
                                    url: '',
                                } as NewWebhook)
                            "
                            >+ Webhook</Button
                        >
                    </div>
                </div>
            </div>
            <div
                class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
            >
                <button
                    type="button"
                    class="text-sm/6 font-semibold text-gray-200 cursor-pointer"
                    @click="navigateTo({ name: 'presets' })"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    class="rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 cursor-pointer"
                >
                    {{ editPreset ? "Update" : "Create" }}
                </button>
            </div>
        </form>
    </div>
</template>
