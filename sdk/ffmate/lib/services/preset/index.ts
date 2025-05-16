import { type AxiosInstance } from "axios"
import Base, { type Options } from "../../Base"
import type { PaginatedResponse } from "../../interfaces/global/paginatedResponse"
import type { NewPreset, Preset } from "../../interfaces/presets/preset"

export default class PresetService extends Base {
  constructor(options: Options, axios: AxiosInstance) {
    super(options, axios)
  }

  public getPresets = async (page?: number, perPage?: number) => {
    page = page ?? 0
    perPage = perPage ?? 100
    const res = await this.axios.get<Preset[]>(
      this.getEndpoint(`?page=${page}&perPage=${perPage}`)
    )

    const total = parseInt(res.headers["x-total"])
    return { items: res.data, total: total } as PaginatedResponse<Preset[]>
  }

  public getPreset = async (presetUuid: string) => {
    const res = await this.axios.get<Preset>(this.getEndpoint(`/${presetUuid}`))

    return res.data
  }

  public getGlobalPresets = async () => {
    const res = await this.axios.get<NewPreset[]>(
      "https://earth.ffmate.io/_presets/index.json"
    )

    return res.data
  }

  public delete = async (uuid: string) => {
    await this.axios.delete(this.getEndpoint(`/${uuid}`))
  }

  public create = async (preset: NewPreset) => {
    return await this.axios.post<Preset>(this.getEndpoint(""), preset)
  }

  public update = async (presetUuid: string, preset: NewPreset) => {
    return await this.axios.put<Preset>(
      this.getEndpoint("/" + presetUuid),
      preset
    )
  }

  protected getEndpoint(endpoint: string): string {
    return `${this.server}/api/v1/presets${endpoint}`
  }
}
