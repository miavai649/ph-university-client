import { academicManagementApi } from '../../../redux/features/admin/academicManagement'

const AcademicSemester = () => {
  const { data, isError, isLoading, isSuccess } =
    academicManagementApi.useGetAllAcademicSemesterQuery(undefined)
  console.log('🚀 ~ AcademicSemester ~ data:', {
    data,
    isError,
    isLoading,
    isSuccess
  })

  return (
    <div>
      <h1>This is AcademicSemester component</h1>
    </div>
  )
}

export default AcademicSemester
