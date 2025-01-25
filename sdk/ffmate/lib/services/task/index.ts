import { type AxiosInstance } from "axios";
import Base, { type Options } from "../../Base";
import type { PaginatedResponse } from "../../interfaces/global/paginatedResponse";
import type { Task } from "../../interfaces/tasks/task";

export default class TaskService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  public getTasks = async (
    page?: number,
    perPage?: number,
    status?: string
  ) => {
    page = page ?? 0;
    perPage = perPage ?? 100;
    const res = await this.axios.get<Task[]>(
      this.getEndpoint(
        `?page=${page}&perPage=${perPage}${status ? `&status=${status}` : ""}`
      )
    );

    const total = parseInt(res.headers["x-total"]);
    return { items: res.data, total: total } as PaginatedResponse<Task[]>;
  };

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/tasks${endpoint}`;
  }
}
