import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import { Button, Col, Flex } from 'antd'
import PHSelect from '../../../components/form/PHSelect'
import { semesterOptions } from '../../../constants/semester'
import { monthOptions } from '../../../constants/global'
import { zodResolver } from '@hookform/resolvers/zod'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement'
import { toast } from 'sonner'
import { TResponse } from '../../../types'
import { TAcademicSemester } from '../../../types/academicManagement.type'
import { createAcademicSemesterSchema } from '../../../schemas/academicManagement.schema'

const currentYear = new Date().getFullYear()
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number)
}))

const CreateAcademicSemester = () => {
  // create create academic semester RTK query hook
  const [addAcademicSemester] =
    academicManagementApi.useAddAcademicSemesterMutation()

  // create academicSemester onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')
    const name = semesterOptions[Number(data?.name) - 1]?.label

    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth
    }

    try {
      const res = (await addAcademicSemester(
        semesterData
      )) as TResponse<TAcademicSemester>
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId })
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
        <h1 style={{ marginBottom: '1rem' }}>Create Academic Semester</h1>
        {/* academic semester create form */}
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicSemesterSchema)}>
          <PHSelect label='Name' name='name' options={semesterOptions} />
          <PHSelect label='Year' name='year' options={yearOptions} />
          <PHSelect
            label='Start Month'
            name='startMonth'
            options={monthOptions}
          />
          <PHSelect label='End Month' name='endMonth' options={monthOptions} />
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

export default CreateAcademicSemester
