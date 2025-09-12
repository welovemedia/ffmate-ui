import type { AxiosInstance } from "axios";
import Base, { type Options } from "../Base";
import type { Preset } from "../interfaces/presets/preset";
import type { Task } from "../interfaces/tasks/task";
import type { Watchfolder } from "../interfaces/watchfolder/watchfolder";
import type { Webhook, WebhookExecution } from "../interfaces/webhooks/webhook";
import type { Settings } from "../interfaces/settings/settings";

export type CallbackEvent = {
  id?: string;
  onAdd?: (data: WebsocketMessage) => void;
  onUpdate?: (data: WebsocketMessage) => void;
  onDelete?: (data: WebsocketMessage) => void;
};

export interface WebsocketMessage {
  subject: string;
  payload:
    | Task
    | Preset
    | Watchfolder
    | Webhook
    | WebhookExecution
    | Settings
    | Client
    | string;
}

export default class WebsocketService extends Base {
  private conn: WebSocket | null = null;
  private callbacks: CallbackEvent[] = [];
  private reconnectTimeout: number | null = null;
  private reconnectDelay = 1000; // 1 second delay for reconnection
  private debug = useDebug("websocket");

  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  disconnect() {
    if (
      this.conn?.readyState === WebSocket.OPEN ||
      this.conn?.readyState === WebSocket.CONNECTING
    ) {
      this.conn.close();
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }

  private createConnection() {
    this.conn = new WebSocket(
      this.getEndpoint("").replace("http", "ws").replace("https", "wss"),
    );

    this.conn.onopen = () => {
      this.debug("webSocket connection established.");
    };

    this.conn.onmessage = (event) => {
      const data: WebsocketMessage = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.conn.onclose = () => {
      this.debug("webSocket connection closed. Attempting to reconnect...");
      this.scheduleReconnect();
    };

    this.conn.onerror = (error) => {
      this.debug("webSocket error occurred:", error);
      this.scheduleReconnect();
    };
  }

  private scheduleReconnect() {
    if (!this.reconnectTimeout) {
      this.reconnectTimeout = window.setTimeout(() => {
        this.reconnectTimeout = null;
        if (!this.conn || this.conn.readyState === WebSocket.CLOSED) {
          this.createConnection();
        }
      }, this.reconnectDelay);
    }
  }

  private handleMessage(data: WebsocketMessage) {
    switch (data.subject.split(":")[1]) {
      case "created":
        this.callbacks.forEach((cb) => cb.onAdd?.(data));
        break;
      case "updated":
        this.callbacks.forEach((cb) => cb.onUpdate?.(data));
        break;
      case "deleted":
        this.callbacks.forEach((cb) => cb.onDelete?.(data));
        break;
      case "finished":
        // ignore batch:finished
        break;
      default:
        this.debug("unhandled WebSocket message subject:", data.subject);
        break;
    }
  }

  connect(callback: CallbackEvent): string {
    if (!this.conn || this.conn.readyState === WebSocket.CLOSED) {
      this.createConnection();
    }

    const id = useId();
    callback.id = id;
    this.callbacks.push(callback);
    return id;
  }

  unsubscribe(id: string) {
    this.callbacks = this.callbacks.filter((cb) => cb.id !== id);
  }

  protected getEndpoint(endpoint: string): string {
    return `${this.server
      .replace("https", "wss")
      .replace("http", "ws")}/api/v1/ws${endpoint}`;
  }
}
