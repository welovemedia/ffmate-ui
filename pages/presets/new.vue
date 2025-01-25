<script lang="ts" setup>
import type { NewPreset } from "~/sdk/ffmate/lib/interfaces/presets/preset";

const form = reactive({
  name: "",
  description: "",
  command: "",
  priority: 0,
  outputFile: "",
  preProcessing: {
    scriptPath: "",
    sidecarPath: "",
  },
  postProcessing: {
    scriptPath: "",
    sidecarPath: "",
  },
});

const save = () => {
  const n = {
    name: form.name,
    description: form.description,
    command: form.command,
    priority: form.priority,
    outputFile: form.outputFile,
    preProcessing: {
      scriptPath: form.preProcessing.scriptPath,
      sidecarPath: form.preProcessing.sidecarPath,
    },
    postProcessing: {
      scriptPath: form.postProcessing.scriptPath,
      sidecarPath: form.postProcessing.sidecarPath,
    },
  } as NewPreset;

  useFFMate()
    .Preset.create(n)
    .then(() => {
      navigateTo({ name: "presets" });
    });
};
</script>

<template>
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base/7 font-semibold text-gray-200">New Preset</h2>
      <p class="mt-1 text-sm/6 text-gray-400">
        Create a new preset to use in your watchfolders.
      </p>
    </div>

    <form
      class="bg-gray-800 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
      @submit.prevent="save"
    >
      <div class="px-4 py-6 sm:p-8">
        <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm/6 font-medium text-gray-200"
              >Description</label
            >
            <div class="mt-2">
              <textarea
                v-model="form.description"
                placeholder="Enter watchfolder description"
                name="about"
                id="about"
                rows="3"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-full">
            <label
              for="first-name"
              class="block text-sm/6 font-medium text-gray-200"
              >Command *</label
            >
            <div class="mt-2">
              <input
                v-model="form.command"
                placeholder="The ffmpeg command"
                type="text"
                name="command"
                id="command"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-full">
            <label for="path" class="block text-sm/6 font-medium text-gray-200"
              >Output file *</label
            >
            <div class="mt-2">
              <input
                v-model="form.outputFile"
                placeholder="Path to watch"
                type="text"
                name="path"
                id="path"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-full">
            <label
              for="priority"
              class="block text-sm/6 font-medium text-gray-200"
              >Priority *</label
            >
            <div class="mt-2">
              <input
                v-model="form.priority"
                type="number"
                name="priority"
                id="priority"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="filter include"
              class="block text-sm/6 font-medium text-gray-200"
              >PreProcessing sidecarPath</label
            >
            <div class="mt-2">
              <input
                v-model="form.preProcessing.sidecarPath"
                placeholder="Comma separated list of extensions"
                type="text"
                name="filter include"
                id="filter include"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label
              for="filter include"
              class="block text-sm/6 font-medium text-gray-200"
              >PreProcessing scriptPath</label
            >
            <div class="mt-2">
              <input
                v-model="form.preProcessing.scriptPath"
                placeholder="Comma separated list of extensions"
                type="text"
                name="filter include"
                id="filter include"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="filter include"
              class="block text-sm/6 font-medium text-gray-200"
              >PostProcessing sidecarPath</label
            >
            <div class="mt-2">
              <input
                v-model="form.postProcessing.sidecarPath"
                placeholder="Comma separated list of extensions"
                type="text"
                name="filter include"
                id="filter include"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
          <div class="sm:col-span-3">
            <label
              for="filter include"
              class="block text-sm/6 font-medium text-gray-200"
              >PostProcessing scriptPath</label
            >
            <div class="mt-2">
              <input
                v-model="form.postProcessing.scriptPath"
                placeholder="Comma separated list of extensions"
                type="text"
                name="filter include"
                id="filter include"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
      >
        <button
          type="button"
          class="text-sm/6 font-semibold text-gray-200"
          @click="navigateTo({ name: 'watchfolders' })"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>
