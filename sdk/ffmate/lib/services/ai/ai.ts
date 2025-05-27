import { type AxiosInstance } from "axios"
import Base, { type Options } from "../../Base"
import type { AI } from "../../interfaces/ai/ai"

export default class AIService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios)
  }

  public getAI = async () => {
    const res = await this.axios.get<AI>(this.getEndpoint(``))

    return res.data
  }

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/ai${endpoint}`
  }
}
