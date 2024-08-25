import { Button, Col, Divider, Row } from 'antd'
import PHForm from '../components/form/PHForm'
import PHInput from '../components/form/PHInput'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { userManagementApi } from '../redux/features/admin/userManagement.api'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../redux/hooks'
import { logout } from '../redux/features/auth/authSlice'

const ChangePassword = () => {
  const [changePassword] = userManagementApi.useChangePasswordMutation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await changePassword(data)
      console.log('🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:', res)

      if (res?.data?.success) {
        dispatch(logout())
        navigate('/login')
        toast.success('Password changed successfully')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
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
