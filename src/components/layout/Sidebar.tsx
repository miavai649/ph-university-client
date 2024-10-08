import { Layout, Menu } from 'antd'
import { sidebarItemsGenerator } from '../../utils/sidebarItemsGenerator'
import { adminPaths } from '../../routes/admin.routes'
import { facultyPaths } from '../../routes/faculty.routes'
import { studentPaths } from '../../routes/student.routes'
import { useAppSelector } from '../../redux/hooks'
import {
  TUserDecoded,
  useCurrentToken
} from '../../redux/features/auth/authSlice'
import { verifyToken } from '../../utils/verifyToken'

const { Sider } = Layout

const userRole = {
  ADMIN: 'admin',
  FACULTY: 'faculty',
  STUDENT: 'student'
}

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken)

  let user

  if (token) {
    user = verifyToken(token) as TUserDecoded
  }

  let sidebarItems

  switch (user?.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, 'admin')
      break
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, 'faculty')
      break
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, 'student')
      break

    default:
      break
  }

  return (
    <Sider
      breakpoint='lg'
      collapsedWidth='0'
      style={{ position: 'sticky', height: '100vh', top: '0', left: '0' }}>
      <div
        style={{
          color: 'white',
          height: '4rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <h1>PH Uni</h1>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={['4']}
        items={sidebarItems}
      />
    </Sider>
  )
}

export default Sidebar
