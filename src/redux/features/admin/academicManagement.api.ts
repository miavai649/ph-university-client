import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
  TQueryParams,
  TResponseRedux
} from '../../../types'

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
      },
      providesTags: ['academicSemester']
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: '/academic-semesters/create-academic-semester',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['academicSemester']
    }),
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: '/academic-faculties/create-academic-faculty',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['academicFaculty']
    }),
    getAllAcademicFaculty: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args?.forEach((element: TQueryParams) => {
            params.append(element?.name, element?.value as string)
          })
        }

        return {
          url: '/academic-faculties',
          method: 'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
          meta: response?.meta
        }
      },
      providesTags: ['academicFaculty']
    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: '/academic-departments/create-academic-department',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['academicDepartment']
    }),
    getAllAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          params.append(args.name, args.value)
        }

        return {
          url: '/academic-departments',
          method: 'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response?.data,
          meta: response?.meta
        }
      },
      providesTags: ['academicDepartment']
    })
  })
})
