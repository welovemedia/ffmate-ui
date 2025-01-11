import type { AxiosInstance } from "axios";
import Base, { type Options } from "../Base";
import type { Task } from "../interfaces/tasks/task";

export type CallbackEvent = {
  id?: string;
  onAdd?: (data: WebsocketMessage) => void;
  onUpdate?: (data: WebsocketMessage) => void;
  onDelete?: (data: WebsocketMessage) => void;
  onExecute?: (data: WebsocketMessage) => void;
  onCancel?: (data: WebsocketMessage) => void;
  onError?: (error: Error) => void;
};

export interface WebsocketMessage {
  subject: string;
  payload: Task;
}

export default class WebsocketService extends Base {
  private conn: WebSocket | null = null;
  private connected = false;
  private callbacks: CallbackEvent[] = [];

  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  disconnect() {
    if (this.conn?.readyState === WebSocket.OPEN) {
      this.conn.close();
    }
  }

  connect(callback: CallbackEvent): string {
    if (!this.connected && this.conn?.readyState !== WebSocket.OPEN) {
      this.connected = true;
      this.conn = new WebSocket(
        this.getEndpoint("").replace("http", "ws").replace("https", "wss")
      );
      this.conn.onmessage = (event) => {
        const data: WebsocketMessage = JSON.parse(event.data);

        switch (data.subject) {
          case "task:created":
            this.callbacks.forEach((cb) => cb.onAdd?.(data));
            break;
          case "task:updated":
            this.callbacks.forEach((cb) => cb.onUpdate?.(data));
            break;
          case "task:deleted":
            this.callbacks.forEach((cb) => cb.onDelete?.(data));
            break;
          default:
            break;
        }
      };
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
