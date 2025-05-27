import { type AxiosInstance } from "axios"
import Base, { type Options } from "../../Base"
import type { Client } from "../../interfaces/client/client"

export default class ClientService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios)
  }

  public getClient = async () => {
    const res = await this.axios.get<Client>(this.getEndpoint(``))

    return res.data
  }

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/client${endpoint}`
  }
}
