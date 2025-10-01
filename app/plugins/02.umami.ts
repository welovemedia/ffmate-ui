const urlParam = new URLSearchParams(self.location.search).get("apiServer");
const config = reactive({
  id: "ffmate",
  url: urlParam
    ? urlParam + "/umami"
    : process.env.NODE_ENV === "production"
      ? `${self.location.protocol}//${self.location.host}/umami`
      : `http://localhost:3000/umami`,
  batch: false,
  autoTrack: true,
});

const queue = [] as stat[];

interface stat {
  type: "event";
  payload: payload;
}
interface payload {
  name?: string;
  hostname: string;
  language: string;
  referrer: string;
  screen: string;
  title: string;
  url: string;
  data?: { [key: string]: string };
  website: string;
}

const generateData = (): stat => {
  return {
    payload: {
      hostname: window.location.hostname,
      language: navigator.language,
      referrer: document.referrer,
      screen: `${window.screen.width}x${window.screen.height}`,
      title: document.title,
      url: window.location.pathname,
      website: config.id,
    } as payload,
    type: "event",
  } as stat;
};

const sendQueue = useDebounceFn(
  async () => {
    const d = [...queue];

    queue.length = 0;
    if (config.batch) {
      await fetch(config.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(d.filter((e) => e.payload.website !== "")),
      });
    } else {
      d.forEach(async (data) => {
        if (data.payload.website !== "") {
          await fetch(config.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        }
      });
    }
  },
  config.batch ? 3000 : 10,
);

export interface Umami {
  setWebsiteId: (websiteId: string) => void;
  seUrl: (url: string) => void;
  trackView: () => void;
  trackEvent: (eventName: string, payload?: Record<string, any>) => void;
}

const umami = {
  setWebsiteId: (websiteId: string) => {
    config.id = websiteId;
  },
  seUrl: (url: string) => {
    config.url = url;
  },
  trackView: () => {
    const d = generateData();
    queue.push(d);
    sendQueue();
  },
  trackEvent: (eventName: string, payload?: { [key: string]: string }) => {
    const data = generateData();
    data.payload.name = eventName;
    if (payload) {
      data.payload.data = payload;
    }
    queue.push(data);
    sendQueue();
    if (config.batch) {
    }
  },
} as Umami;

export default defineNuxtPlugin(() => {
  useNuxtApp().hook("page:finish", () =>
    config.autoTrack ? umami.trackView() : undefined,
  );
  return {
    provide: {
      umami,
    },
  };
});
