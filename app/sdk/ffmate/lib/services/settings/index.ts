import { type AxiosInstance } from "axios";
import Base, { type Options } from "../../Base";
import type { Settings } from "../../interfaces/settings/settings";

export default class SettingsService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  public load = async () => {
    const res = await this.axios.get<Settings>(this.getEndpoint(""));
    return res.data;
  };

  public save = async (settings: Settings) => {
    const res = await this.axios.post<Settings>(this.getEndpoint(""), settings);
    return res.data;
  };

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/settings${endpoint}`;
  }
}
