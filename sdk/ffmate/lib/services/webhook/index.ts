import { type AxiosInstance } from "axios"
import Base, { type Options } from "../../Base"
import type { PaginatedResponse } from "../../interfaces/global/paginatedResponse"
import type {
  NewWebhook,
  Webhook,
  WebhookExecution,
} from "../../interfaces/webhooks/webhook"

export default class WebhookService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios)
  }

  public getWebhookExecutions = async (page?: number, perPage?: number) => {
    page = page ?? 0
    perPage = perPage ?? 100
    const res = await this.axios.get<WebhookExecution[]>(
      this.getEndpoint(`/executions?page=${page}&perPage=${perPage}`)
    )

    const total = parseInt(res.headers["x-total"])
    return { items: res.data, total: total } as PaginatedResponse<
      WebhookExecution[]
    >
  }

  public getWebhooks = async (page?: number, perPage?: number) => {
    page = page ?? 0
    perPage = perPage ?? 100
    const res = await this.axios.get<Webhook[]>(
      this.getEndpoint(`?page=${page}&perPage=${perPage}`)
    )

    const total = parseInt(res.headers["x-total"])
    return { items: res.data, total: total } as PaginatedResponse<Webhook[]>
  }

  public getWebhook = async (webhookUuid: string) => {
    const res = await this.axios.get<Webhook>(
      this.getEndpoint(`/${webhookUuid}`)
    )

    return res.data
  }

  public delete = async (uuid: string) => {
    await this.axios.delete(this.getEndpoint(`/${uuid}`))
  }

  public create = async (webhook: NewWebhook) => {
    return await this.axios.post<Webhook>(this.getEndpoint(""), webhook)
  }

  public update = async (webhookUuid: string, webhook: NewWebhook) => {
    return await this.axios.put<Webhook>(
      this.getEndpoint("/" + webhookUuid),
      webhook
    )
  }

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/webhooks${endpoint}`
  }
}
