import { type AxiosInstance } from "axios";

export interface Options {}

export default abstract class Base {
  protected options: Options;
  protected server: string;
  protected axios: AxiosInstance;

  constructor(options: Options, axios: AxiosInstance) {
    this.options = options;

    // add support to overwrite the apiServer using a queryString
    const urlParam = new URLSearchParams(self.location.search).get("apiServer");
    if (urlParam) {
      this.server = urlParam;
    } else {
      this.server =
        process.env.NODE_ENV === "production"
          ? `${self.location.protocol}//${self.location.host}`
          : `http://localhost:3000`;
    }
    this.axios = axios;
  }

  protected abstract getEndpoint(endpoint: string): string;
}
