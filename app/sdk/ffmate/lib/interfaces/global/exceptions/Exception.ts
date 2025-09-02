export default class Exception extends Error {
  status: number
  statusText: string
  code: string
  err: string

  constructor(status: number, statusText: string, code: string, err: string, message: string) {
    super(message)

    this.status = status
    this.statusText = statusText
    this.code = code
    this.err = err
    this.message = message
  }
}
