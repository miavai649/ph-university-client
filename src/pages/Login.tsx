import { Button } from 'antd'
import { FieldValues, useForm } from 'react-hook-form'
import { useAppDispatch } from '../redux/hooks'
import { setUser, TUser } from '../redux/features/auth/authSlice'
import { verifyToken } from '../utils/verifyToken'
import { authApi } from '../redux/features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: 'A-0001',
      password: 'admin123'
    }
  })

  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const [login] = authApi.useLoginMutation()

  const onsubmit = async (data: FieldValues) => {
    const userInfo = {
      id: data.userId,
      password: data.password
    }

    const toastId = toast.loading('Logging in')
    try {
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
    <form onSubmit={handleSubmit(onsubmit)}>
      <div>
        <label htmlFor='id'>Id:</label>
        <input type='text' id='id' {...register('userId')} />
      </div>
      <div>
        <label htmlFor='password'>Password:</label>
        <input type='text' id='password' {...register('password')} />
      </div>
      <Button htmlType='submit'>Submit</Button>
    </form>
  )
}

export default Login
