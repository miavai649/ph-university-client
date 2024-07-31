import { Button, Col, Flex } from 'antd'
import PHForm from '../../../components/form/PHForm'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHInput from '../../../components/form/PHInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAcademicFacultySchema } from '../../../schemas/academicManagement.schema'

const CreateAcademicFaculty = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <Flex justify='center'>
      <Col span={6}>
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
