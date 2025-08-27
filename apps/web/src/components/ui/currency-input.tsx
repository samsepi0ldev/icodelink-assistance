import type React from 'react'
import { forwardRef, useEffect } from 'react'

import { useCurrencyInput } from '@/hooks/use-currency-input'
import { cn } from '@/lib/utils'
import { Input } from './input'

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange'
  > {
  value?: number // Valor em centavos
  onValueChange?: (valueInCents: number) => void
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value = 0, onValueChange, ...props }, ref) => {
    const { displayValue, valueInCents, handleInputChange, setValueInCents } =
      useCurrencyInput({
        initialValue: value,
        onValueChange,
      })

    useEffect(() => {
      if (value !== valueInCents) {
        setValueInCents(value)
      }
    }, [value, valueInCents, setValueInCents])

    return (
      <Input
        className={cn(className)}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="R$ 0,00"
        ref={ref}
        value={displayValue}
        {...props}
      />
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'
