import { type AxiosInstance } from "axios";
import Base, { type Options } from "../../Base";
import type { Task } from "../../interfaces/tasks/task";

export default class TaskService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios);
  }

  public getTasks = async () => {
    const res = await this.axios.get<Task[]>(this.getEndpoint(""));
    return res.data;
  };

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/tasks${endpoint}`;
  }
}
