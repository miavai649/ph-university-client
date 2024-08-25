import { Form, Select } from 'antd'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { TSelectWithWatchProps } from '../../types'
import { useEffect } from 'react'

const PHSelectWithWatch = ({
  label,
  name,
  options,
  disabled,
  mode,
  onValueChange
}: TSelectWithWatchProps) => {
  const method = useFormContext()

  const inputValue = useWatch({
    control: method.control,
    name
  })

  useEffect(() => {
    onValueChange(inputValue)
  }, [inputValue])

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

export default PHSelectWithWatch
