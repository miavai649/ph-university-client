import { z } from 'zod'

export const createAcademicSemesterSchema = z.object({
  name: z.string({ required_error: 'Please select a name' }),
  year: z.string({ required_error: 'Please select a year' }),
  startMonth: z.string({ required_error: 'Please select a start month' }),
  endMonth: z.string({ required_error: 'Please select a end month' })
})

export const createAcademicFacultySchema = z.object({
  name: z.string({ required_error: 'Please enter a name' })
})
