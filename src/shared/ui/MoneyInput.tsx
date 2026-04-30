import * as React from 'react'
import { Input } from '@/shared/ui/input'
import { formatMoney, parseMoney } from '@/shared/lib/formatMoney'

interface MoneyInputProps extends Omit<React.ComponentProps<'input'>, 'value' | 'onChange'> {
  value?: number
  onChange?: (value: number) => void
}

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(
      value !== undefined ? formatMoney(value) : ''
    )

    React.useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(formatMoney(value))
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/[^\d\s]/g, '')
      const numValue = parseMoney(rawValue)
      const formatted = formatMoney(numValue)
      setDisplayValue(formatted)
      if (onChange) {
        onChange(numValue)
      }
    }

    return (
      <Input
        type="text"
        className={className}
        value={displayValue}
        onChange={handleChange}
        ref={ref}
        {...props}
      />
    )
  }
)
MoneyInput.displayName = 'MoneyInput'

export { MoneyInput }
