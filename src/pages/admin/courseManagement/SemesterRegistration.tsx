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

const SemesterRegistration = () => {
  const [registerSemester] =
    courseManagementApi.useAddRegisteredSemesterMutation()

  // getting academic semester data via redux rtk query
  const { data: academicSemester, isLoading: sIsLoading } =
    academicManagementApi.useGetAllAcademicSemesterQuery([
      { name: 'sort', value: 'year' }
    ])

  // making semester options for semester select input field
  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}-${item.year}`
  }))

  // create academicSemester onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')

    const registerSemesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit)
    }

    try {
      const res = (await registerSemester(
        registerSemesterData
      )) as TResponse<any>
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
        <h1 style={{ marginBottom: '1rem' }}>Semester Registration</h1>
        {/* academic semester create form */}
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            label='Academic Semester'
            name='academicSemester'
            options={academicSemesterOptions}
            disabled={sIsLoading}
          />
          <PHSelect
            label='Status'
            name='status'
            options={semesterStatusOptions}
          />
          <PHDatePicker name='startDate' label='Start Date' />
          <PHDatePicker name='endDate' label='End Date' />
          <PHInput name='minCredit' label='Min Credit' type='text' />
          <PHInput name='maxCredit' label='Max Credit' type='text' />
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

export default SemesterRegistration
