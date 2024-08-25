import {
  TCourse,
  TCourseFaculties,
  TQueryParams,
  TResponseRedux,
  TSemester
} from '../../../types'
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
    }),
    updateRegisteredSemester: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args?.id}`,
        method: 'PATCH',
        body: args?.data
      }),
      invalidatesTags: ['registeredSemester']
    }),
    getAllCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string)
          })
        }

        return {
          url: '/courses',
          method: 'GET',
          params: params
        }
      },
      providesTags: ['course'],
      transformResponse: (response: TResponseRedux<TCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: '/courses/create-course',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['course']
    }),
    addFaculties: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: 'PUT',
        body: args.data
      }),
      invalidatesTags: ['course']
    }),
    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TCourseFaculties>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    createOfferCourse: builder.mutation({
      query: (data) => ({
        url: `/offered-courses/create-offered-course`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['offerCourse']
    })
  })
})
