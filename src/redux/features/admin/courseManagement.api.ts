import { TQueryParams, TResponseRedux, TSemester } from '../../../types'
import { baseApi } from '../../api/baseApi'

export const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRegisteredSemester: builder.mutation({
      query: (data) => ({
        url: '/semester-registrations/create-semester-registration',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['registeredSemester']
    }),
    getAllRegisteredSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string)
          })
        }

        return {
          url: '/semester-registrations',
          method: 'GET',
          params: params
        }
      },
      providesTags: ['registeredSemester'],
      transformResponse: (response: TResponseRedux<TSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    })
  })
})
