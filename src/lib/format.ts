const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function formatLongDate(value: string) {
  if (!value) return ''
  return dateFormatter.format(new Date(`${value}T12:00:00`))
}

export function getTodayISO() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function normalizePhone(value: string) {
  return value.replace(/[^\d]/g, '')
}

export function isValidMexicanPhone(value: string) {
  const digits = normalizePhone(value)
  return digits.length === 10 || (digits.length === 12 && digits.startsWith('52'))
}
