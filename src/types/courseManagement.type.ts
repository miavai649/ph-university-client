import { TAcademicSemester } from './academicManagement.type'
import { TFaculty } from './userManagement.type'

export type TSemester = {
  _id: string
  academicSemester: TAcademicSemester
  status: string
  startDate: string
  endDate: string
  minCredit: number
  maxCredit: number
  createdAt: string
  updatedAt: string
}

export type TCourse = {
  _id: string
  title: string
  prefix: string
  code: number
  credits: number
  preRequisiteCourses: { course: string | null; isDeleted: boolean }[]
  isDeleted: boolean
}

export type TCourseFaculties = {
  _id: string
  __v: number
  course: string
  faculties: TFaculty[]
}
