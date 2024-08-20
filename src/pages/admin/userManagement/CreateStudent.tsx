import { FieldValues, SubmitHandler } from 'react-hook-form'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { Button } from 'antd'

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData()

    formData.append('data', JSON.stringify(data))

    // ! This is for development
    // ! Just for checking
    console.log(Object.fromEntries(formData))
  }

  return (
    <PHForm onSubmit={onSubmit}>
      <PHInput name='name' type='text' label='Name' />
      <Button htmlType='submit'>Submit</Button>
    </PHForm>
  )
}

export default CreateStudent
