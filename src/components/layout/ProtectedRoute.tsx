import { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  logout,
  selectCurrentUser,
  TUserDecoded,
  useCurrentToken
} from '../../redux/features/auth/authSlice'
import { Navigate } from 'react-router-dom'
import { verifyToken } from '../../utils/verifyToken'

type TProtectedRouteProps = {
  children: ReactNode
  role: string | undefined
}

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken)

  if (!token) {
    return <Navigate to={'/login'} replace />
  }

  const user = verifyToken(token) as TUserDecoded

  const dispatch = useAppDispatch()

  if (role !== undefined && role !== user?.role) {
    dispatch(logout())
    return <Navigate to={'/login'} replace />
  }

  return children
}

export default ProtectedRoute
