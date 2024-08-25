import { Button, Col, Divider, Row } from 'antd'
import PHForm from '../components/form/PHForm'
import PHInput from '../components/form/PHInput'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const ChangePassword = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '100vh' }}>
      <Col>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center'
          }}>
          Change Password
        </h1>
        <Divider />
        <PHForm onSubmit={onSubmit}>
          <PHInput type='text' name='oldPassword' label='Old Password:' />

          <PHInput type='text' name='newPassword' label='New Password:' />

          <Button
            style={{ background: '#001529', color: 'white' }}
            htmlType='submit'>
            Submit
          </Button>
        </PHForm>
      </Col>
    </Row>
  )
}

export default ChangePassword
