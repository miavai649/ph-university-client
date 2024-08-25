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

const OfferCourse = () => {
  const [courseId, setCourseId] = useState('')
  console.log('🚀 ~ OfferCourse ~ courseId:', courseId)

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
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
          <PHSelect label='Faculty' name='faculty' options={[]} />
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
