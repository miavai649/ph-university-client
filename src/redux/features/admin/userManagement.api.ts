import { TQueryParams, TResponseRedux } from '../../../types'
import { TStudent } from '../../../types/userManagement.type'
import { baseApi } from '../../api/baseApi'

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudents: builder.mutation({
      query: (data) => ({
        url: '/users/create-student',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['students']
    }),
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args.forEach((element: TQueryParams) => {
            params.append(element.name, element.value as string)
          })
        }

        return {
          url: '/students',
          method: 'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      },
      providesTags: ['students']
    })
  })
})
