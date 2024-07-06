import { Button } from 'antd'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../redux/hooks'
import { setUser } from '../redux/features/auth/authSlice'
import { verifyToken } from '../utils/verifyToken'
import { authApi } from '../redux/features/auth/authApi'

type TLoginInfo = {
  userId: string
  password: string
}

const Login = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userId: 'A-0001',
      password: 'admin123'
    }
  })

  const dispatch = useAppDispatch()

  const [login] = authApi.useLoginMutation()

  const onsubmit = async (data: TLoginInfo) => {
    const userInfo = {
      id: data.userId,
      password: data.password
    }

    const res = await login(userInfo).unwrap()

    const user = verifyToken(res.data.accessToken)
    console.log('🚀 ~ onsubmit ~ user:', user)

    dispatch(setUser({ user, token: res.data.accessToken }))
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
