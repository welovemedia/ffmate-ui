<script lang="ts" setup>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import type { NewWatchfolder } from "~/sdk/ffmate/lib/interfaces/watchfolders/watchfolder";

const presetStore = usePresetStore();

const form = reactive({
  name: "",
  description: "",
  path: "",
  preset: presetStore.presets[0]?.uuid,
  interval: 5,
  growthChecks: 3,
  filterInclude: "",
  filterExclude: "",
});

const save = () => {
  const n = {
    name: form.name,
    description: form.description,
    interval: form.interval,
    growthChecks: form.growthChecks,
    preset: form.preset,
    path: form.path,
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

  useFFMate()
    .Watchfolder.create(n)
    .then(() => {
      navigateTo({ name: "watchfolders" });
    });
};
</script>

<template>
  <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
    <div class="px-4 sm:px-0">
      <h2 class="text-base/7 font-semibold text-gray-200">New Watchfolder</h2>
      <p class="mt-1 text-sm/6 text-gray-400">
        Create a new watchfolder to automatically create new tasks
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-full">
            <label for="path" class="block text-sm/6 font-medium text-gray-200"
              >Path *</label
            >
            <div class="mt-2">
              <input
                v-model="form.path"
                placeholder="Path to watch"
                type="text"
                name="path"
                id="path"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-full">
            <label
              for="country"
              class="block text-sm/6 font-medium text-gray-200"
              >Preset</label
            >
            <div class="mt-2">
              <select
                v-model="form.preset"
                id="preset"
                name="preset"
                class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-800 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
              >
                <option
                  v-for="preset in presetStore.presets"
                  :value="preset.uuid"
                >
                  {{ preset.name }}
                </option>
              </select>
            </div>
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600 sm:text-sm/6"
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
          class="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          Create
        </button>
      </div>
    </form>
  </div>
</template>
