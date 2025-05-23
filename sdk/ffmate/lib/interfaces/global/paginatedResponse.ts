export interface PaginatedResponse<T> {
  items: T
  total: number
  version?: string
}
