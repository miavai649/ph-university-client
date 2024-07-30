import { TResponseRedux } from '../../../types'
import { TAcademicSemester } from '../../../types/academicManagement.type'
import { baseApi } from '../../api/baseApi'

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: (args) => {
        console.log(args)
        const params = new URLSearchParams()

        if (args) {
          args?.forEach((element) => {
            params.append(element?.name, element?.item)
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
    })
  })
})
