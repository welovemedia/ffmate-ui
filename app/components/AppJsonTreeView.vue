<template>
  <ul class="font-[Monospace] text-sm">
    <!-- KEYS: if value is an non null object or key -->
    <li
      v-if="
        json.value !== null &&
        (json.typeof === 'object' || json.typeof === 'array')
      "
      class="group flex cursor-pointer flex-row items-center"
      @click="handleOpen($event, !isOpen)"
    >
      <!-- all non null objects and array can be expanded -->
      <ChevronRightIcon
        class="mr-2 size-2 cursor-pointer text-xs text-gray-300 transition-transform duration-100"
        :class="{
          'rotate-90': isOpen,
        }"
      />

      <!-- key is NOT a number -->
      <span
        v-if="Number.isNaN(parseInt(baseHeader))"
        :class="colors.keys.value.isObject"
        ><span v-html="highlight(baseHeader)"></span>
        <!-- value is an object -->
        <span v-if="json.typeof !== 'array'" :class="colors.length"
          >{{ " {" + json.length + "}" }}
          <span class="text-xs text-gray-400">{{
            searchResults ? "has search results" : ""
          }}</span></span
        >
        <!-- value is an array -->
        <span v-else :class="colors.length"> [{{ json.length }}]</span></span
      >
      <!-- key is a number -->
      <span v-else :class="colors.keys.value.isArray"
        ><span v-html="highlight(baseHeader)"></span>
        <span :class="colors.length"
          >{{ " {" + json.length + "}" }}
          <span class="text-xs text-gray-400">{{
            searchResults ? "has search results" : ""
          }}</span></span
        ></span
      >

      <ClipboardDocumentIcon
        v-if="options?.copyToClipboard"
        class="invisible ml-2 size-3 cursor-pointer text-xs text-gray-400 hover:text-gray-300 group-hover:visible"
        @click.stop="copyToClipboard"
      ></ClipboardDocumentIcon>
    </li>

    <!-- VALUES: value is a non-null object or array (recurive iteration) -->
    <template
      v-if="
        (json.value !== null && json.typeof === 'object') ||
        json.typeof === 'array'
      "
    >
      <li v-for="k in json.keys" :key="k" class="flex flex-row items-center">
        <transition
          enter-active-class="transition-all ease duration-100"
          enter-from-class="opacity-0 translate-x-2"
          enter-to-class="opacity-100 translate-x-0"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 translate-x-2"
          leave-active-class="transition-all ease duration-100"
        >
          <self
            v-if="isOpen"
            ref="$children"
            class="ml-[17px]"
            :base="k"
            :options="options"
            :openByDefault="openByDefault"
            :level="level ?? 0 + 1"
            :prefix="genPath(k)"
            :parentType="json.typeof"
            :json="(json.value as any)[k]"
            :search="search"
            @copyToClipboard="(val: string) => emit('copyToClipboard', val)"
          />
        </transition>
      </li>
    </template>

    <!-- VALUES: value is a string -->
    <li
      v-if="json.typeof === 'string'"
      class="group flex flex-row items-center"
    >
      <span :class="colors.keys.value.isString"
        ><span v-html="highlight(baseHeader)"></span>:
        <span :class="colors.values.isString"
          >"<span
            class="break-all"
            v-html="highlight((json.value as string).replaceAll(' ', '&nbsp;'))"
          ></span
          >"</span
        ></span
      >
      <div class="w-8">
        <ClipboardDocumentIcon
          v-if="options?.copyToClipboard"
          class="invisible ml-2 size-3 cursor-pointer text-xs text-gray-400 hover:text-gray-300 group-hover:visible"
          @click="copyToClipboard"
        ></ClipboardDocumentIcon>
      </div>
    </li>

    <!-- VALUES: value is a number -->
    <li
      v-if="json.typeof === 'number'"
      class="group flex flex-row items-center"
    >
      <!-- parent is array -->
      <span v-if="parentType === 'array'" :class="colors.keys.value.isArray"
        ><span v-html="highlight(baseHeader)"></span>:
        <span :class="colors.values.isNumber">{{ json.value }}</span></span
      >
      <!-- parent is NOT array -->
      <span v-else :class="colors.keys.value.isNumber"
        ><span v-html="highlight(baseHeader)"></span>:
        <span :class="colors.values.isNumber"
          ><span
            class="break-all"
            v-html="highlight(json.value as string)"
          ></span></span
      ></span>
      <div class="w-8">
        <ClipboardDocumentIcon
          v-if="options?.copyToClipboard"
          class="invisible ml-2 size-3 cursor-pointer text-xs text-gray-400 hover:text-gray-300 group-hover:visible"
          @click="copyToClipboard"
        ></ClipboardDocumentIcon>
      </div>
    </li>

    <!-- VALUES: value is a boolean -->
    <li
      v-if="json.typeof === 'boolean'"
      class="group flex flex-row items-center"
    >
      <span :class="colors.keys.value.isBoolean"
        ><span v-html="highlight(baseHeader)"></span>:
        <span :class="colors.values.isBoolean"
          ><span v-html="highlight(json.value as boolean)"></span></span
      ></span>
      <div class="w-8">
        <ClipboardDocumentIcon
          v-if="options?.copyToClipboard"
          class="invisible ml-2 size-3 cursor-pointer text-xs text-gray-400 hover:text-gray-300 group-hover:visible"
          @click="copyToClipboard"
        ></ClipboardDocumentIcon>
      </div>
    </li>

    <!-- VALUES: value is null -->
    <li
      v-if="json.typeof === 'null' || json.value === null"
      class="group flex flex-row items-center"
    >
      <span :class="colors.keys.value.isNull"
        ><span v-html="highlight(baseHeader)"></span>:
        <span :class="colors.values.isNull"
          ><span v-html="highlight('null')"></span></span
      ></span>
      <div class="w-8">
        <ClipboardDocumentIcon
          v-if="options?.copyToClipboard"
          class="invisible ml-2 size-3 cursor-pointer text-xs text-gray-400 hover:text-gray-300 group-hover:visible"
          @click="copyToClipboard"
        ></ClipboardDocumentIcon>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import type { AppJsonTreeView } from "#build/components"
import {
  ChevronRightIcon,
  ClipboardDocumentIcon,
} from "@heroicons/vue/24/solid"

interface Props {
  root?: string
  base?: string
  parentType?: "object" | "array"
  level?: number
  prefix?: string
  json: JSONValue
  options?: Options
  openByDefault?: boolean
  search?: {
    search: string
    wholeWord: boolean
    caseSensitive: boolean
    setSearchResults: (total: number) => void
  }
}
const props = defineProps<Props>()

const searchResults = computed(() => {
  props.search?.search
  return calculateSearchResults(json)
})

const calculateSearchResults = (json: JSONMethods): number => {
  let results = 0

  if (!props.search?.search) {
    return results
  }

  const searchTerm = props.search.search
  const caseSensitive = props.search.caseSensitive ?? false
  const wholeWord = props.search.wholeWord ?? false

  const countMatches = (value: string): number => {
    const flags = caseSensitive ? "g" : "gi"
    const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    const pattern = wholeWord ? `\\b${escapedSearchTerm}\\b` : escapedSearchTerm
    const regex = new RegExp(pattern, flags)

    const matches = value.match(regex)
    return matches ? matches.length : 0
  }

  switch (json.typeof) {
    case "number":
    case "boolean":
      results += countMatches(String(json.value))
      break
    case "string":
      results += countMatches(json.value as string)
      break
    case "array":
    case "object":
      json.keys.forEach((key) => {
        results += countMatches(key) // Count matches in the key itself
        const child = new JSONMethods((json.value as any)[key] ?? "null")
        results += calculateSearchResults(child) // Recursively calculate results for nested values
      })
      break
  }

  if (props.root) {
    props.search?.setSearchResults(results) // Update the search results count
  }

  return results
}

export type JSONValue =
  | null
  | string
  | number
  | boolean
  | { [x: string]: JSONValue }
  | Array<JSONValue>

const $children = ref<InstanceType<typeof AppJsonTreeView>[]>([])

const searchResult = reactive({
  search: "",
  wholeWord: false,
  caseSensitive: false,
})

export interface Options {
  readonly?: boolean
  copyToClipboard?: boolean
  expandLevels?: number
}

const colors = {
  length: "text-gray-300",
  keys: {
    value: {
      isObject: "text-teal-500",
      isArray: "text-red-500",
      isString: "text-orange-500",
      isBoolean: "text-orange-500",
      isNumber: "text-orange-500",
      isNull: "text-orange-500",
    },
  },
  values: {
    isString: "text-green-500",
    isBoolean: "text-indigo-500",
    isNumber: "text-indigo-500",
    isNull: "text-red-500",
  },
}

const highlight = (value: string | number | boolean): string | unknown => {
  return value
}

class JSONMethods {
  value: JSONValue

  constructor(value: JSONValue) {
    this.value = value
  }

  get keys(): string[] {
    if (!this.value) {
      return []
    }
    return Object.keys(this.value)
  }

  get length(): number {
    if (!this.value) {
      return 0
    }
    return Object.keys(this.value).length
  }

  get typeof(): string {
    switch (typeof this.value) {
      case null:
        return "null"
      case "string":
        return "string"
      case "number":
        return "number"
      case "boolean":
        return "boolean"
      case "object":
        if (Array.isArray(this.value)) return "array"
        return "object"
      default:
        return "unknown"
    }
  }
}

const emit = defineEmits(["copyToClipboard", "searchResults"])

const handleOpen = (event: MouseEvent, value: boolean) => {
  event.stopPropagation()
  isOpen.value = value
  if (event.shiftKey && $children.value) {
    $children.value?.forEach((c: InstanceType<typeof AppJsonTreeView>) => {
      c.handleOpen(event, value)
    })
  }
}

const copyToClipboard = () => {
  if (props.root) {
    emit("copyToClipboard", "")
  } else {
    if (props.prefix) {
      emit("copyToClipboard", props.prefix)
    }
  }
}

const genPath = (key: string): string => {
  key = /^[a-zA-Z0-9]+$/g.test(key) ? key : `["${key}"]`
  const n = json.typeof === "array" ? `[${key}]` : key

  return props.prefix ? `${props.prefix}.${n}` : n
}

const baseHeader = props.base ?? props.root ?? "root"
const json = new JSONMethods(props.json)
const self = resolveComponent("AppJsonTreeView", true)

const isOpen = ref(
  props.openByDefault || (props.level ?? 0) < (props.options?.expandLevels ?? 1)
)

defineExpose({ handleOpen })
</script>
