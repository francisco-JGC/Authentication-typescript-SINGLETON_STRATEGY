export type ErrorHTTP<T = unknown> =
  | { status: 401; message: string }
  | { status: 404; message: string }
  | { status: 400; message: string; data?: T }
  | { status: 500; message: string; details: string; data?: T }

export interface ErrorResponse<T = unknown> {
  status: number
  message: string
  data?: T
}

const handleError = <T = unknown>(
  error: ErrorHTTP<T>
): Promise<ErrorResponse<T>> => {
  const errorMap = {
    400: () => ({ status: 400, message: 'Bad Request' }),
    401: () => ({ status: 401, message: 'Unauthorized' }),
    404: () => ({ status: 404, message: 'Not Found' }),
    default: () => ({
      status: 500,
      message: 'Internal Server Error',
      details: error.message
    })
  }

  const { status, message, data } =
    (errorMap as any)[error.status] || errorMap.default()

  return Promise.reject({ status, message, data })
}

export const handleNotFound = async <T = unknown>(): Promise<
  ErrorResponse<T>
> => {
  return await handleError<T>({
    status: 404,
    message: 'Not Found'
  })
}

export const handleBadRequest = async <T = unknown>(
  data: T
): Promise<ErrorResponse<T>> => {
  return await handleError<T>({
    status: 400,
    message: 'Bad Request',
    data
  })
}

export const handleUnauthorized = async <T = unknown>(
  data: T
): Promise<ErrorResponse<T>> => {
  return await handleError<T>({
    status: 401,
    message: 'Unauthorized'
  })
}

export const handleInternalServerError = async <T = unknown>(
  data: T
): Promise<ErrorResponse<T>> => {
  return await handleError<T>({
    status: 500,
    message: 'Internal Server Error',
    details: data as any
  })
}

export default handleError
