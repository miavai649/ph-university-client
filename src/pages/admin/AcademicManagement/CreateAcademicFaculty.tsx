import { Button, Col, Flex } from 'antd'
import PHForm from '../../../components/form/PHForm'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHInput from '../../../components/form/PHInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAcademicFacultySchema } from '../../../schemas/academicManagement.schema'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import { toast } from 'sonner'
import { TResponse } from '../../../types'
import { TAcademicFaculty } from '../../../types/academicManagement.type'

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] =
    academicManagementApi.useAddAcademicFacultyMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...')

    const facultyData = {
      name: data?.name
    }

    try {
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFaculty>
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId })
      } else {
        toast.success('Faculty created successfully', { id: toastId })
      }
    } catch (error) {
      toast.error('Something went wrong', { id: toastId })
    }
  }

  return (
    <Flex justify='center'>
      <Col span={6}>
        <h1 style={{ marginBottom: '1rem' }}>Create Academic Faculty</h1>
        {/* create academic faculty form */}
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicFacultySchema)}>
          <PHInput type={'text'} name={'name'} label='Name' />
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

export default CreateAcademicFaculty
