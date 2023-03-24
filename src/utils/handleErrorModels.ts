export type ResponseHTTP<T = unknown> =
  | { status: 200; message: string; data?: T }
  | { status: 401; message: string }
  | { status: 404; message: string }
  | { status: 400; message: string; data?: T }
  | { status: 500; message: string; details: string; data?: T }

export interface Response<T = unknown> {
  status: number
  message: string
  data?: T
}

const handleResponseHTTP = <T = unknown>(
  res: ResponseHTTP<T>
): Promise<Response<T>> => {
  const mapHTTP = {
    200: () => ({ status: 200, message: 'OK' }),
    400: () => ({ status: 400, message: 'Bad request' }),
    401: () => ({ status: 401, message: 'Unauthorized' }),
    404: () => ({ status: 404, message: 'Not Found' }),
    default: () => ({
      status: 500,
      message: 'Internal Server res',
      details: res.message
    })
  }

  const { status, message, data } =
    (mapHTTP as any)[res.status] || mapHTTP.default()

  return Promise.reject({ status, message, data })
}

export const handleOK = async <T = unknown>(data: T): Promise<Response<T>> => {
  return await handleResponseHTTP<T>({
    status: 200,
    message: 'OK',
    data
  })
}

export const handleNotFound = async <T = unknown>(): Promise<Response<T>> => {
  return await handleResponseHTTP<T>({
    status: 404,
    message: 'Not Found'
  })
}

export const handleBadresuest = async <T = unknown>(
  data: T
): Promise<Response<T>> => {
  return await handleResponseHTTP<T>({
    status: 400,
    message: 'Bad resuest',
    data
  })
}

export const handleUnauthorized = async <T = unknown>(
  data: T
): Promise<Response<T>> => {
  return await handleResponseHTTP<T>({
    status: 401,
    message: 'Unauthorized'
  })
}

export const handleInternalServerError = async <T = unknown>(
  data: T
): Promise<Response<T>> => {
  return await handleResponseHTTP<T>({
    status: 500,
    message: 'Internal Server res',
    details: data as any
  })
}

export default handleResponseHTTP
