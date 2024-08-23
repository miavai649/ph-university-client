import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import { Button, Col, Flex } from 'antd'
import PHSelect from '../../../components/form/PHSelect'
import { toast } from 'sonner'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import PHDatePicker from '../../../components/form/PHDatePicker'
import PHInput from '../../../components/form/PHInput'
import { semesterStatusOptions } from '../../../constants/semester'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'
import { TResponse } from '../../../types'

const CreateCourse = () => {
  const [registerSemester] =
    courseManagementApi.useAddRegisteredSemesterMutation()

  // making pre requisite courses options
  const { data: courses, isLoading: cLoading } =
    courseManagementApi.useGetAllCoursesQuery(undefined)

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title
  }))

  // create academicSemester onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')

    const registerSemesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit)
    }
    console.log(
      '🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ registerSemesterData:',
      registerSemesterData
    )

    // try {
    //   const res = (await registerSemester(
    //     registerSemesterData
    //   )) as TResponse<any>
    //   if (res?.error) {
    //     toast.error(res.error.data.message, { id: toastId })
    //   } else {
    //     toast.success('Semester created successfully', { id: toastId })
    //   }
    // } catch (error) {
    //   toast.error('Something went wrong', { id: toastId })
    // }
  }
  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <h1 style={{ marginBottom: '1rem' }}>Create Course</h1>
        {/* create course form */}
        <PHForm onSubmit={onSubmit}>
          <PHInput name='title' label='Title' type='text' />
          <PHInput name='prefix' label='Prefix' type='text' />
          <PHInput name='code' label='Code' type='text' />
          <PHInput name='credits' label='Credits' type='text' />
          <PHSelect
            label='Pre Requisite Courses'
            name='preRequisiteCourses'
            mode='multiple'
            options={preRequisiteCoursesOptions}
            disabled={cLoading}
          />
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

export default CreateCourse
