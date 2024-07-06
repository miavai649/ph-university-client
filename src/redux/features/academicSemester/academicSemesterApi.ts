import { baseApi } from '../../api/baseApi'

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.mutation({
      query: () => ({
        url: '/academic-semesters',
        method: 'GET'
      })
    })
  })
})
