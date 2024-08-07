import { academicManagementApi } from '../../../redux/features/admin/academicManagement'

const AcademicFaculty = () => {
  const { data } =
    academicManagementApi.useGetAllAcademicFacultyQuery(undefined)
  console.log('🚀 ~ AcademicFaculty ~ data:', data)

  return (
    <div>
      <h1>This is AcademicFaculty component</h1>
    </div>
  )
}

export default AcademicFaculty
