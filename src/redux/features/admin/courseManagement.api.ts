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
    })
  })
})
