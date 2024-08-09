export type TAcademicSemester = {
  _id: string
  name: string
  year: string
  code: string
  startMonth: string
  endMonth: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type TAcademicSemesterTableData = Pick<
  TAcademicSemester,
  'name' | 'year' | 'startMonth' | 'endMonth'
>

export type TAcademicFaculty = {
  _id: string
  name: string
  createdAt: string
}

export type TAcademicFacultyTableData = {
  name: string
  date: string
  time: string
}
