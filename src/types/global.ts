export type TError = {
  data: {
    message: string
    stack: string
    success: boolean
  }
  statusCode: number
}

export type TResponse = {
  data?: any
  error?: TError
}
