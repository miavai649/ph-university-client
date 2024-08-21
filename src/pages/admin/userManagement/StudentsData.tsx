import { userManagementApi } from '../../../redux/features/admin/userManagement.api'

const StudentsData = () => {
  const { data: studentsData } =
    userManagementApi.useGetAllStudentsQuery(undefined)
  console.log('🚀 ~ StudentsData ~ studentsData:', studentsData)

  return (
    <div>
      <h1>This is StudentsData component</h1>
    </div>
  )
}

export default StudentsData
