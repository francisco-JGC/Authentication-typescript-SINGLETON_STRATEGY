type ErrorHTTP<T = unknown> =
  | { status: 401; message: string }
  | { status: 404; message: string }
  | { status: 400; message: string; data?: T }
  | { status: 500; message: string; details: string; data?: T }

interface ErrorResponse<T = unknown> {
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

export { handleError }
