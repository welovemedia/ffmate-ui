<script lang="ts" setup>
import { Switch } from "@headlessui/vue"
import { ChevronDownIcon } from "@heroicons/vue/24/solid"
import type {
  NewWatchfolder,
  Watchfolder,
} from "~/sdk/ffmate/lib/interfaces/watchfolders/watchfolder"

const presetStore = usePresetStore()
const route = useRoute()

const editWatchfolder = ref<Watchfolder | null>(null)
const editWatchfolderId = route.query["edit"] as string
if (editWatchfolderId) {
  await useFFMate()
    .Watchfolder.getWatchfolder(editWatchfolderId)
    .then((preset) => {
      editWatchfolder.value = preset
    })
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
})

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
  } as NewWatchfolder
  if (form.filterInclude) {
    n.filter!.extensions!.include = form.filterInclude.split(",")
  }
  if (form.filterExclude) {
    n.filter!.extensions!.exclude = form.filterExclude.split(",")
  }

  if (editWatchfolder.value) {
    useFFMate()
      .Watchfolder.update(editWatchfolder.value.uuid, n)
      .then(() => {
        navigateTo({ name: "watchfolders" })
      })
  } else {
    useFFMate()
      .Watchfolder.create(n)
      .then(() => {
        navigateTo({ name: "watchfolders" })
      })
  }
}
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
      class="shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
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
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
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
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
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
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div class="sm:col-span-full">
            <div>
              <label
                for="location"
                class="block text-sm/6 font-medium text-white"
                >Preset *</label
              >
              <div class="mt-2 grid grid-cols-1">
                <select
                  id="preset"
                  name="preset"
                  class="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-700 py-1.5 pl-3 pr-8 text-base text-gray-300 outline-1 outline-gray-600 -outline-offset- focus:outline-2 focus:-outline-offset-2 focus:outline-primary-500 sm:text-sm/6"
                  v-model="form.preset"
                >
                  <option
                    v-for="preset in presetStore.presets"
                    :value="preset.uuid"
                  >
                    {{ preset.name }}
                  </option>
                </select>
                <ChevronDownIcon
                  class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                  aria-hidden="true"
                />
              </div>
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
            <div class="mt-2 flex items-center justify-end gap-x-4">
              <Switch
                v-model="form.suspended"
                :class="[
                  !form.suspended ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                ]"
              >
                <span class="sr-only">Enabled</span>
                <span
                  :class="[
                    !form.suspended ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none relative inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  ]"
                >
                  <span
                    :class="[
                      !form.suspended
                        ? 'opacity-0 duration-100 ease-out'
                        : 'opacity-100 duration-200 ease-in',
                      'absolute inset-0 flex size-full items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <svg
                      class="size-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <span
                    :class="[
                      !form.suspended
                        ? 'opacity-100 duration-200 ease-in'
                        : 'opacity-0 duration-100 ease-out',
                      'absolute inset-0 flex size-full items-center justify-center transition-opacity',
                    ]"
                    aria-hidden="true"
                  >
                    <svg
                      class="size-3 text-indigo-600"
                      fill="currentColor"
                      viewBox="0 0 12 12"
                    >
                      <path
                        d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
                      />
                    </svg>
                  </span>
                </span>
              </Switch>
              <label
                for="filter include"
                class="block text-sm/6 font-medium text-gray-200"
                >Enabled</label
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8"
      >
        <button
          type="button"
          class="text-sm/6 font-semibold text-gray-200 cursor-pointer"
          @click="navigateTo({ name: 'watchfolders' })"
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
