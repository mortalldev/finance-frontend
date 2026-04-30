export function formatMoney(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '0'
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function parseMoney(value: string): number {
  if (!value) return 0
  return Number(value.toString().replace(/\s/g, ''))
}
