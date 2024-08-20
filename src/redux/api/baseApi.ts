import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { logout, setUser } from '../features/auth/authSlice'
import { toast } from 'sonner'

// main base query
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    // preparing headers for request
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', token)
    }
    return headers
  }
})

// custom base query to catch access token authorization error so that we can send refresh token to get a new access token
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result: { error?: FetchBaseQueryError } = await baseQuery(
    args,
    api,
    extraOptions
  )

  // checking if the user exists or not
  if (result?.error?.status === 404) {
    const errorMessage = (result.error.data as { message: string }).message
    toast.error(errorMessage)
  }

  // checking if the user is authenticated or not
  if (result?.error?.status === 401) {
    // sending refresh token
    const res = await fetch('http://localhost:5000/api/v1/auth/refresh-token', {
      method: 'POST',
      credentials: 'include'
    })

    const data = await res.json()
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user

      api.dispatch(setUser({ user, token: data?.data?.accessToken }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }
  }
  return result
}

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ['academicSemester', 'academicFaculty']
})
