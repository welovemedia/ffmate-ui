const _current = ref<PageTitle | undefined>(undefined);

type PageTitle = {
  title: string;
  description: string;
  documentation: string;
};

export const PageTitles = {
  Dashboard: {
    title: "Dashboard",
    description: "Monitor and manage FFmate tasks",
    documentation: "https://docs.ffmate.io/docs/web-ui#dashboard",
  },
  Watchfolders: {
    title: "Watchfolders",
    description: "Monitor folders for new files to automatically process",
    documentation: "https://docs.ffmate.io/docs/web-ui#watchfolders",
  },
  EditWatchfolder: {
    title: "Edit Watchfolder",
    description: "Modify watchfolder configuration",
    documentation: "https://docs.ffmate.io/docs/web-ui#updating-a-watchfolder",
  },
  NewWatchfolder: {
    title: "New Watchfolder",
    description: "Create a new watchfolder configuration",
    documentation: "https://docs.ffmate.io/docs/web-ui#creating-a-watchfolder",
  },
  Presets: {
    title: "Presets",
    description: "Manage encoding presets and configurations",
    documentation: "https://docs.ffmate.io/docs/web-ui#presets",
  },
  EditPreset: {
    title: "Edit Preset",
    description: "Modify preset configuration",
    documentation: "https://docs.ffmate.io/docs/web-ui#updating-a-preset",
  },
  NewPreset: {
    title: "New Preset",
    description: "Create a new preset configuration",
    documentation: "https://docs.ffmate.io/docs/web-ui#creating-a-preset",
  },
  Webhooks: {
    title: "Webhooks",
    description: "Configure HTTP endpoints to receive event notifications",
    documentation: "https://docs.ffmate.io/docs/web-ui#webhooks",
  },
  EditWebhook: {
    title: "Edit Webhook",
    description: "Modify webhook configuration",
    documentation: "https://docs.ffmate.io/docs/web-ui#updating-a-webhook",
  },
  NewWebhook: {
    title: "New Webhook",
    description: "Create a new webhook configuration",
    documentation: "https://docs.ffmate.io/docs/web-ui#creating-a-webhook",
  },
  SentWebhooks: {
    title: "Sent Webhooks",
    description: "Monitor previously executed Webhooks",
    documentation: "https://docs.ffmate.io/docs/web-ui#webhooks",
  },
  Clients: {
    title: "Clients",
    description: "Monitor cluster render clients",
    documentation: "https://docs.ffmate.io/docs/ffmate-internals#client-endpoint",
  },
  Settings: {
    title: "Settings",
    description: "Modify general settings",
    documentation: "https://docs.ffmate.io/docs/ffmate-internals#client-endpoint",
  },
  Updates: {
    title: "Updates",
    description: "Check for updates",
    documentation: "https://docs.ffmate.io/docs/getting-started#updating-ffmate",
  },
  Logs: {
    title: "Logs",
    description: "Monitor logs in realtime",
    documentation: "https://docs.ffmate.io/docs/web-ui#accessing-real-time-logs",
  },
} as { [key: string]: PageTitle };

export const useSetCurrentPage = () => {
  const setCurrent = (cur?: PageTitle | undefined) => {
    _current.value = cur;
    return _current.value;
  };

  return { current: _current.value, setCurrent };
};
