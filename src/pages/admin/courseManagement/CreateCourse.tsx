import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import { Button, Col, Flex } from 'antd'
import PHSelect from '../../../components/form/PHSelect'
import { toast } from 'sonner'
import PHInput from '../../../components/form/PHInput'
import { courseManagementApi } from '../../../redux/features/admin/courseManagement.api'

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

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: string) => ({
            course: item,
            isDeleted: false
          }))
        : []
    }

    console.log(courseData)

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
          <PHInput name='code' label='Code' type='number' />
          <PHInput name='credits' label='Credits' type='number' />
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
