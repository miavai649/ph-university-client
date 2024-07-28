import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import { Button, Col, Flex } from 'antd'
import PHSelect from '../../../components/form/PHSelect'
import { semesterOptions } from '../../../constants/semester'
import { monthOptions } from '../../../constants/global'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const currentYear = new Date().getFullYear()
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number)
}))

// todo : i need to explore zod hook form resolver

const CreateAcademicSemester = () => {
  // create academicSemester onSubmit function
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label

    const semesterData = {
      name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth
    }
    console.log(semesterData)
  }

  const createSemesterSchema = z.object({
    name: z.string({ required_error: 'Please select a name' }),
    year: z.string({ required_error: 'Please select a year' }),
    startMonth: z.string({ required_error: 'Please select a start month' }),
    endMonth: z.string({ required_error: 'Please select a end month' })
  })

  return (
    <Flex justify='center' align='center'>
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createSemesterSchema)}>
          <PHSelect label='Name' name='name' options={semesterOptions} />
          <PHSelect label='Year' name='year' options={yearOptions} />
          <PHSelect
            label='Start Month'
            name='startMonth'
            options={monthOptions}
          />
          <PHSelect label='End Month' name='endMonth' options={monthOptions} />
          <Button htmlType='submit'>Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  )
}

export default CreateAcademicSemester
