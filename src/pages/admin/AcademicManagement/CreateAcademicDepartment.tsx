import { Button, Col, Flex } from 'antd'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import PHSelect from '../../../components/form/PHSelect'

const CreateAcademicDepartment = () => {
  const { data: facultyData } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined)

  const facultyOptions =
    facultyData?.data?.map((faculty) => ({
      value: faculty?._id,
      label: faculty?.name
    })) || []

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <Flex justify='center'>
      <Col span={6}>
        <h1 style={{ marginBottom: '1rem' }}>Create Academic Department</h1>
        <PHForm onSubmit={onSubmit}>
          <PHInput type='text' name='name' label='Name' />
          <PHSelect
            label='Academic Faculty'
            name='academicFaculty'
            options={facultyOptions}
          />
          <Button htmlType='submit'>Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  )
}

export default CreateAcademicDepartment
