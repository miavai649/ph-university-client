import { BaseQueryApi } from '@reduxjs/toolkit/query'
import React from 'react'

export type TError = {
  data: {
    message: string
    stack: string
    success: boolean
  }
  statusCode: number
}

export type TMeta = {
  limit: number
  page: number
  total: number
  totalPage: number
}

export type TResponse<T> = {
  success: boolean
  message: string
  meta?: TMeta
  data?: T
  error?: TError
}

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi

export type TQueryParams = {
  name: string
  value: boolean | React.Key
}