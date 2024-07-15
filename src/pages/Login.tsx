import { Button, Row } from 'antd'
import { FieldValues } from 'react-hook-form'
import { useAppDispatch } from '../redux/hooks'
import { setUser, TUser } from '../redux/features/auth/authSlice'
import { verifyToken } from '../utils/verifyToken'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import PHForm from '../components/form/PHForm'
import PHInput from '../components/form/PHInput'
import { authApi } from './../redux/features/auth/authApi'

const Login = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [login] = authApi.useLoginMutation()

  const defaultValues = {
    userId: 'A-0001',
    password: 'admin123'
  }

  const onSubmit = async (data: FieldValues) => {
    console.log(data)

    const toastId = toast.loading('Logging in')
    try {
      const userInfo = {
        id: data.userId,
        password: data.password
      }
      const res = await login(userInfo).unwrap()

      const user = verifyToken(res.data.accessToken) as TUser

      dispatch(setUser({ user, token: res.data.accessToken }))
      toast.success('Logged in', { id: toastId, duration: 2000 })
      navigate(`/${user.role}/dashboard`)
    } catch (error) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 })
    }
  }

  return (
    <Row justify={'center'} align={'middle'} style={{ height: '100vh' }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHInput type='text' name='userId' label='Id:' />

        <PHInput type='text' name='password' label='Password:' />

        <Button htmlType='submit'>Submit</Button>
      </PHForm>
    </Row>
  )
}

export default Login
