<script lang="ts" setup>
import type { WebhookExecution } from "~/sdk/ffmate/lib/interfaces/webhooks/webhook"

const presetStore = usePresetStore()

interface Props {
  webhookExecution: WebhookExecution
}
const props = defineProps<Props>()

const request = props.webhookExecution.request
const response = props.webhookExecution.response

function safeParseJSON(str: string | undefined) {
  if (!str) return null
  try {
    return JSON.parse(str)
  } catch (e) {
    return null
  }
}

const parsedRequest = request.headers?.["Content-Type"]?.includes(
  "application/json"
)
  ? { headers: request.headers, body: safeParseJSON(request.body) }
  : request

const parsedResponse = response.headers?.["Content-Type"]?.includes(
  "application/json"
)
  ? {
      headers: response.headers,
      status: response.status,
      body: safeParseJSON(response.body),
    }
  : response
</script>

<template>
  <div class="pt-12">
    <div class="px-4 sm:px-0">
      <h3 class="text-base/7 font-semibold text-white">
        {{ webhookExecution.event }}
      </h3>
      <p class="max-w-2xl text-sm/6 text-gray-400">
        executed {{ useTimeAgo(new Date(webhookExecution.createdAt)) }}
      </p>
    </div>
    <div class="mt-6 border-t border-white/10">
      <dl class="divide-y divide-white/10">
        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">UUID</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            {{ webhookExecution.uuid }}
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Status</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <span
              :class="{
                'text-red-500': webhookExecution.response.status >= 400,
                'text-green-500': webhookExecution.response.status < 400,
              }"
            >
              {{ webhookExecution.response.status >= 400 ? "ERROR" : "OK" }}
            </span>
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Request</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <AppJsonTreeView
              :openByDefault="true"
              root="Request"
              :json="parsedRequest"
            />
          </dd>
        </div>

        <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt class="text-sm/6 font-medium text-white">Response</dt>
          <dd class="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
            <AppJsonTreeView
              :options="{
                copyToClipboard: true,
              }"
              :openByDefault="true"
              root="Response"
              :json="parsedResponse"
            />
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>
