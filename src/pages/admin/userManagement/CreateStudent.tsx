import { Controller, FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { Button, Col, Divider, Input, Row } from 'antd'
import PHSelect from '../../../components/form/PHSelect'
import { bloodGroupOptions, genderOptions } from '../../../constants/global'
import PHDatePicker from '../../../components/form/PHDatePicker'
import { academicManagementApi } from '../../../redux/features/admin/academicManagement.api'
import { userManagementApi } from '../../../redux/features/admin/userManagement.api'

// ! This is only for development
// ! Should be removed

const studentDefaultValues = {
  name: {
    firstName: 'Hridoy',
    lastName: 'Mojumdar'
  },
  gender: 'male',
  bloogGroup: 'A+',

  email: 'hridoy@gmail.com',
  contactNo: '1235678',
  emergencyContactNo: '987-654-3210',
  presentAddress: '123 Main St, Cityville',
  permanentAddress: '456 Oak St, Townsville',

  guardian: {
    fatherName: 'James Doe',
    fatherOccupation: 'Engineer',
    fatherContactNo: '111-222-3333',
    motherName: 'Mary Doe',
    motherOccupation: 'Teacher',
    motherContactNo: '444-555-6666'
  },

  localGuardian: {
    name: 'Alice Johnson',
    occupation: 'Doctor',
    contactNo: '777-888-9999',
    address: '789 Pine St, Villageton'
  },

  admissionSemester: '66c4dda81ee0fadf2877dc1a',
  academicDepartment: '66bbbd1e275e178b27250e39'
}

const CreateStudent = () => {
  // getting academic semester data via redux rtk query
  const { data: sData, isLoading: sIsLoading } =
    academicManagementApi.useGetAllAcademicSemesterQuery(undefined)

  // getting academic department data via redux rtk query
  const { data: dData, isLoading: dIsLoading } =
    academicManagementApi.useGetAllAcademicDepartmentQuery(undefined, {
      skip: sIsLoading
    })

  // making semester options for semester select input field
  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`
  }))

  // making department options for department select input field
  const departmentOptions = dData?.data?.map(({ _id, name }) => ({
    value: _id,
    label: name
  }))

  // using redux rtk query for create new student
  const [addStudent] = userManagementApi.useAddStudentsMutation()

  // submission form for create a new student
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: 'student123',
      student: data
    }

    const formData = new FormData()

    formData.append('data', JSON.stringify(studentData))
    formData.append('file', data.image)

    // creating new student
    addStudent(formData)

    // ! This is for development
    // console.log(Object.fromEntries(formData))
  }

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          {/* ...... Personal information ....... */}
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name='name.firstName' type='text' label='First Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name='name.middleName' type='text' label='Middle Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name='name.lastName' type='text' label='Last Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label='Gender' name='gender' options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name='dateOfBirth' label='Date of Birth' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label='Blood Group'
                name='bloogGroup'
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name='image'
                render={({ field: { onChange, value, ...field } }) => (
                  <Input
                    type='file'
                    value={value?.filename}
                    size='large'
                    {...field}
                    onChange={(e) => onChange(e?.target?.files?.[0])}
                  />
                )}
              />
            </Col>
          </Row>

          {/* ...... contact information ...... */}
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name='email' type='email' label='Email' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput name='contactNo' type='text' label='Contact No.' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='emergencyContactNo'
                type='text'
                label='Emergency Contact No.'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='presentAddress'
                type='text'
                label='Present Address'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='permanentAddress'
                type='text'
                label='Permanent Address'
              />
            </Col>
          </Row>

          {/* ...... guardian information ...... */}
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='guardian.fatherName'
                type='text'
                label='Father Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='guardian.fatherOccupation'
                type='text'
                label='Father Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='guardian.fatherContactNo'
                type='text'
                label='Father Contact No.'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='guardian.motherName'
                type='text'
                label='Mother Name'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='guardian.motherOccupation'
                type='text'
                label='Mother Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='guardian.motherContactNo'
                type='text'
                label='Mother Contact No.'
              />
            </Col>
          </Row>

          {/* ...... local guardian information ...... */}
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type='text' name='localGuardian.name' label='Name' />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='localGuardian.occupation'
                type='text'
                label='Occupation'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='localGuardian.contactNo'
                type='text'
                label='Contact No.'
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                name='localGuardian.address'
                type='text'
                label='Address'
              />
            </Col>
          </Row>

          {/* .......... academic information ........... */}
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label='Admission Semester'
                name='admissionSemester'
                options={semesterOptions}
                disabled={sIsLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label='Academic Department'
                name='academicDepartment'
                options={departmentOptions}
                disabled={dIsLoading}
              />
            </Col>
          </Row>

          <Button htmlType='submit'>Submit</Button>
        </PHForm>
      </Col>
    </Row>
  )
}

export default CreateStudent
