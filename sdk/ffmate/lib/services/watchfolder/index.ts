import { type AxiosInstance } from "axios";
import Base, { type Options } from "../../Base";
import type { PaginatedResponse } from "../../interfaces/global/paginatedResponse";
import type { Watchfolder } from "../../interfaces/watchfolders/watchfolder";

export default class WatchfolderService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  public getWatchfolders = async (page?: number, perPage?: number) => {
    page = page ?? 0;
    perPage = perPage ?? 100;
    const res = await this.axios.get<Watchfolder[]>(
      this.getEndpoint(`?page=${page}&perPage=${perPage}`)
    );

    const total = parseInt(res.headers["x-total"]);
    return { items: res.data, total: total } as PaginatedResponse<
      Watchfolder[]
    >;
  };

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/watchfolders${endpoint}`;
  }
}
