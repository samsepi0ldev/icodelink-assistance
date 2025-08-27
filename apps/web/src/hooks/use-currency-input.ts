import { useCallback, useState } from 'react'

interface UseCurrencyInputProps {
  initialValue?: number
  onValueChange?: (valueInCents: number) => void
}

interface UseCurrencyInputReturn {
  displayValue: string
  valueInCents: number
  handleInputChange: (value: string) => void
  setValueInCents: (cents: number) => void
  formatCurrency: (cents: number) => string
}

export function useCurrencyInput({
  initialValue = 0,
  onValueChange,
}: UseCurrencyInputProps = {}): UseCurrencyInputReturn {
  const [valueInCents, setValueInCentsState] = useState<number>(initialValue)

  const formatCurrency = useCallback((cents: number): string => {
    const reais = cents / 100
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(reais)
  }, [])

  const parseInputToCents = useCallback((input: string): number => {
    const numbersOnly = input.replace(/\D/g, '')

    if (!numbersOnly) return 0

    return Number.parseInt(numbersOnly, 10)
  }, [])

  const displayValue = formatCurrency(valueInCents)

  const handleInputChange = useCallback(
    (input: string) => {
      const cents = parseInputToCents(input)
      setValueInCentsState(cents)
      onValueChange?.(cents)
    },
    [parseInputToCents, onValueChange]
  )

  const setValueInCents = useCallback(
    (cents: number) => {
      setValueInCentsState(cents)
      onValueChange?.(cents)
    },
    [onValueChange]
  )

  return {
    displayValue,
    valueInCents,
    handleInputChange,
    setValueInCents,
    formatCurrency,
  }
}
