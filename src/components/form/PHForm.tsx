import { Form } from 'antd'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import { TFormConfig, TFormProps } from '../../types'

const PHForm = ({
  onSubmit,
  children,
  defaultValues,
  resolver
}: TFormProps) => {
  const formConfig: TFormConfig = {}

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues
  }

  if (resolver) {
    formConfig['resolver'] = resolver
  }

  const methods = useForm(formConfig)

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <Form layout='vertical' onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  )
}

export default PHForm
