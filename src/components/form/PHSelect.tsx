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
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: '100%', marginBottom: '4px' }}
            {...field}
            options={options}
            size='large'
          />
          {error && <small style={{ color: 'red' }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  )
}

export default PHSelect
