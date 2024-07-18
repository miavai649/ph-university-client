import { Form, Select } from 'antd'
import { Controller } from 'react-hook-form'

type TSelectProps = {
  label: string
  name: string
  options: { value: string; label: string; disabled?: boolean }[]
}

const PHSelect = ({ label, name, options }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%' }}
            {...field}
            options={options}
            size='large'
          />
        </Form.Item>
      )}
    />
  )
}

export default PHSelect
