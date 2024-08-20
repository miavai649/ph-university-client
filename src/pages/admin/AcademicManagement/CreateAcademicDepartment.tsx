import { Col, Flex } from 'antd'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const CreateAcademicDepartment = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <Flex>
      <Col span={6}>
        <h1 style={{ marginBottom: '1rem' }}>Create Academic Department</h1>
        <PHForm onSubmit={onSubmit}>
          <PHInput type='text' name='name' label='Name' />
        </PHForm>
      </Col>
    </Flex>
  )
}

export default CreateAcademicDepartment
