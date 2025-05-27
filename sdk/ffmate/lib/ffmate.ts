import axios, { type AxiosInstance } from "axios"
import type { Options } from "./Base"
import wrapException from "./helper/ErrorHelper"
import { disableCacheHeaders } from "./interfaces/axios"
import AIService from "./services/ai/ai"
import ClientService from "./services/client/client"
import PresetService from "./services/preset"
import TaskService from "./services/task"
import WatchfolderService from "./services/watchfolder"
import WebsocketService from "./services/websocket"

const VERSION = "0.0.1";
const DEFAULT_OPTIONS: Options = {};

export default class SevWtf {
  private options: Options;
  private axios: AxiosInstance;
  public Tasks: TaskService;
  public Watchfolder: WatchfolderService;
  public Preset: PresetService;
  public Client: ClientService;
  public AI: AIService;
  public Websocket: WebsocketService;

  constructor(options?: Options) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
    this.axios = axios.create({
      transformRequest: axios.defaults.transformRequest,
      transformResponse: axios.defaults.transformResponse,
    });
    this.axios.defaults.headers.common["x-user-agent"] = `ffmate/v${VERSION}`;

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(wrapException(error));
      }
    );

    this.Tasks = new TaskService(this.options, this.axios);
    this.Watchfolder = new WatchfolderService(this.options, this.axios);
    this.Preset = new PresetService(this.options, this.axios);
    this.Client = new ClientService(this.options, this.axios);
    this.AI = new AIService(this.options, this.axios);
    this.Websocket = new WebsocketService(this.options, this.axios);
  }

  /**
   * Return the current options
   */
  getOptions(): Options {
    return this.options;
  }

  /**
   * Send various no-cache headers globally with every request
   */
  disableCachingGlobally(): SevWtf {
    this.axios.defaults.headers.common = {
      ...this.axios.defaults.headers.common,
      ...disableCacheHeaders,
    };
    return this;
  }

  /**
   * getAxios returns the active axios instance
   * Use it to add additional request/response interceptors
   * @returns {AxiosInstance} AxiosInstance
   */
  getAxios(): AxiosInstance {
    return this.axios;
  }

  /**
   * setAxios overwrites the existing axios instance
   * Use it to add a caching layer to axios
   * @returns {AxiosInstance} The new AxiosInstance
   */
  setAxios(axios: AxiosInstance): AxiosInstance {
    return (this.axios = axios);
  }
}
