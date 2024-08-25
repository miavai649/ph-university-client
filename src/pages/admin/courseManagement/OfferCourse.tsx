import { Button, Col, Flex } from 'antd'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import PHSelect from '../../../components/form/PHSelect'
import PHInput from '../../../components/form/PHInput'
import { daysOptions } from '../../../constants/global'
import PHTimePicker from '../../../components/form/PHTimePicker'
import PHSelectWithWatch from '../../../components/form/PHSelectWithWatch'
import { useState } from 'react'
import moment from 'moment'
import { toast } from 'sonner'
import { TCourseFaculties, TResponse } from '../../../types'

const OfferCourse = () => {
  const [courseId, setCourseId] = useState('')

  const [createOfferCourse] = courseManagementApi.useCreateOfferCourseMutation()

  const { data: semesterRegistrationData } =
    courseManagementApi.useGetAllRegisteredSemestersQuery([
      { name: 'sort', value: 'year' },
      { name: 'status', value: 'UPCOMING' }
    ])

  const { data: academicFacultyData } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined)

  const { data: academicDepartmentData } =
    academicManagementApi.useGetAllAcademicDepartmentQuery(undefined)

  const { data: courseData } =
    courseManagementApi.useGetAllCoursesQuery(undefined)

  const { data: facultiesData, isFetching: facultyFetching } =
    courseManagementApi.useGetCourseFacultiesQuery(courseId, {
      skip: !courseId
    })

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`
    })
  )

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name
  }))

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name
    })
  )

  const courseOptions = courseData?.data?.map((item) => ({
    value: item._id,
    label: item.title
  }))

  const facultyOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName
  }))

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')

    const offerCourseData = {
      ...data,
      section: Number(data.section),
      maxCapacity: Number(data.maxCapacity),
      startTime: moment(new Date(data.startTime)).format('HH:mm'),
      endTime: moment(new Date(data.endTime)).format('HH:mm')
    }

    try {
      const res = (await createOfferCourse(
        offerCourseData
      )) as TResponse<TCourseFaculties>

      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId })
      } else {
        toast.success('Semester created successfully', { id: toastId })
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }
  }

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <h1 style={{ marginBottom: '1rem' }}>Create Offer Course</h1>
        {/* academic semester create form */}
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label='Semester Registration'
            name='semesterRegistration'
            options={semesterRegistrationOptions}
          />
          <PHSelect
            label='Academic Faculty'
            name='academicFaculty'
            options={academicFacultyOptions}
          />
          <PHSelect
            label='Academic Department'
            name='academicDepartment'
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            label='Course'
            onValueChange={setCourseId}
            name='course'
            options={courseOptions}
          />
          <PHSelect
            disabled={!courseId || facultyFetching}
            label='Faculty'
            name='faculty'
            options={facultyOptions}
          />
          <PHInput label='Section' name='section' type='text' />
          <PHInput label='Max Capacity' name='maxCapacity' type='text' />
          <PHSelect
            label='Days'
            name='days'
            options={daysOptions}
            mode='multiple'
          />
          <PHTimePicker name='startTime' label='Start Time' />
          <PHTimePicker name='endTime' label='End Time' />
          <Button
            style={{ background: '#001529', color: 'white' }}
            htmlType='submit'>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Flex>
  )
}

export default OfferCourse
