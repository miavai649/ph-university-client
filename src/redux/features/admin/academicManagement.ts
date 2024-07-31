import { TQueryParams, TResponseRedux } from '../../../types'
import { TAcademicSemester } from '../../../types/academicManagement.type'
import { baseApi } from '../../api/baseApi'

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args?.forEach((element: TQueryParams) => {
            params.append(element?.name, element?.value as string)
          })
        }

        return {
          url: '/academic-semesters',
          method: 'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data
      })
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: data
      })
    })
  })
})
