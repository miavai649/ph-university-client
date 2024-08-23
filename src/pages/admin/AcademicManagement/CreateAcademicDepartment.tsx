import { Button, Col, Flex } from 'antd'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import PHSelect from '../../../components/form/PHSelect'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAcademicDepartmentSchema } from '../../../schemas/academicManagement.schema'
import { toast } from 'sonner'
import { TAcademicDepartment, TResponse } from '../../../types'

const CreateAcademicDepartment = () => {
  const { data: facultyData, isLoading } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined)

  const facultyOptions = facultyData?.data?.map((faculty) => ({
    value: faculty?._id,
    label: faculty?.name
  }))

  const [addAcademicDepartment] =
    academicManagementApi.useAddAcademicDepartmentMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')

    const departmentData = {
      name: data?.name,
      academicFaculty: data?.academicFaculty
    }

    try {
      const res = (await addAcademicDepartment(
        departmentData
      )) as TResponse<TAcademicDepartment>

      if (res?.error) {
        toast.error('Failed to created department', { id: toastId })
      } else {
        toast.success('Department created successfully', { id: toastId })
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }
  }

  return (
    <Flex justify='center'>
      <Col span={6}>
        <h1 style={{ marginBottom: '1rem' }}>Create Academic Department</h1>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}>
          <PHInput type='text' name='name' label='Name' />
          <PHSelect
            label='Academic Faculty'
            name='academicFaculty'
            disabled={isLoading}
            options={facultyOptions}
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

export default CreateAcademicDepartment
