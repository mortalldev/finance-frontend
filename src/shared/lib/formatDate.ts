import { format } from 'date-fns'

export function formatDate(isoString: string | Date): string {
  if (!isoString) return ''
  try {
    return format(new Date(isoString), 'dd.MM.yyyy HH:mm')
  } catch (error) {
    return String(isoString)
  }
}
