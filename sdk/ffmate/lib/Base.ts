import { type AxiosInstance } from "axios"

export interface Options {}

export default abstract class Base {
  protected options: Options;
  protected server: string;
  protected axios: AxiosInstance;

  constructor(options: Options, axios: AxiosInstance) {
    this.options = options;
    this.server =
      process.env.NODE_ENV === "production"
        ? `http://${self.location.host}`
        : `http://localhost:3000`;
    this.axios = axios;
  }

  protected abstract getEndpoint(endpoint: string): string;
}
