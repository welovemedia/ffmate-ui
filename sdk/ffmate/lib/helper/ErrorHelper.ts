import axios from 'axios'
import Exception from '../interfaces/global/exceptions/Exception'

export default function wrapException<T>(error: T): T | Exception {
  if (axios.isAxiosError(error) && error.response) {
    return new Exception(
      error.response.status,
      error.response.statusText,
      error.response.data.code,
      error.response.data.error,
      error.response.data.message
    )
  }
  return error
}

export function isException(obj: unknown): obj is Exception {
  return typeof obj === 'object' && obj instanceof Exception
}
