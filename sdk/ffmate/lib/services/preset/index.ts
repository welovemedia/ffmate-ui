import { type AxiosInstance } from "axios";
import Base, { type Options } from "../../Base";
import type { PaginatedResponse } from "../../interfaces/global/paginatedResponse";
import type { NewPreset, Preset } from "../../interfaces/presets/preset";

export default class PresetService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  public getPresets = async (page?: number, perPage?: number) => {
    page = page ?? 0;
    perPage = perPage ?? 100;
    const res = await this.axios.get<Preset[]>(
      this.getEndpoint(`?page=${page}&perPage=${perPage}`)
    );

    const total = parseInt(res.headers["x-total"]);
    return { items: res.data, total: total } as PaginatedResponse<Preset[]>;
  };

  public delete = async (uuid: string) => {
    await this.axios.delete(this.getEndpoint(`/${uuid}`));
  };

  public create = async (preset: NewPreset) => {
    return await this.axios.post<Preset>(this.getEndpoint(""), preset);
  };

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/presets${endpoint}`;
  }
}
