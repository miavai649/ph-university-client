import { baseApi } from '../../api/baseApi'

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => ({
        url: '/academic-semesters',
        method: 'GET'
      })
    })
  })
})
