import { BaseQueryApi } from '@reduxjs/toolkit/query'
import React, { ReactNode } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'

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

export type TFormConfig = {
  defaultValues?: Record<string, any>
  resolver?: any
}

export type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>
  children: ReactNode
} & TFormConfig

export type TInputProps = {
  type: string
  name: string
  label?: string
}

export type TSelectProps = {
  label: string
  name: string
  options: { value: string; label: string; disabled?: boolean }[]
}
