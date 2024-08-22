import { ReactNode } from 'react'

export type TSidebarItem =
  | {
      key: string
      label: ReactNode
      children?: TSidebarItem[]
    }
  | undefined

export type TRoute = {
  path: string
  element: ReactNode
}

export type TPaths = {
  name: string
  path?: string
  element?: ReactNode
  children?: TPaths[]
}
