export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '')

  if (digits.length !== 11) return false
  if (/^(\d)\1{10}$/.test(digits)) return false

  const calcDigit = (partial: string, factor: number): number => {
    let sum = 0
    for (let i = 0; i < partial.length; i++) {
      sum += parseInt(partial[i], 10) * (factor - i)
    }
    const remainder = sum % 11
    return remainder < 2 ? 0 : 11 - remainder
  }

  const first = calcDigit(digits.slice(0, 9), 10)
  if (first !== parseInt(digits[9], 10)) return false

  const second = calcDigit(digits.slice(0, 10), 11)
  if (second !== parseInt(digits[10], 10)) return false

  return true
}

export function formatCPF(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}
