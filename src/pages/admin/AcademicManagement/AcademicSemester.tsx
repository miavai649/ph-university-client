import { academicSemesterApi } from '../../../redux/features/academicSemester/academicSemesterApi'

const AcademicSemester = () => {
  const { data, isError, isLoading, isSuccess } =
    academicSemesterApi.useGetAllAcademicSemesterQuery(undefined)
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
