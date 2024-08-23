import { Form, Select } from 'antd'
import { Controller } from 'react-hook-form'
import { TSelectProps } from '../../types'

const PHSelect = ({ label, name, options, disabled, mode }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            style={{ width: '100%', marginBottom: '4px' }}
            {...field}
            disabled={disabled}
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
