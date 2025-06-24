import dayjs from 'dayjs'

export function generateDatesFromCurrentMonth() {
  const firstDayOfMonth = dayjs().startOf('month')
  const lastDayOfMonth = dayjs().endOf('month')

  const dates = []
  let currentDate = firstDayOfMonth

  while (currentDate.isBefore(lastDayOfMonth) || currentDate.isSame(lastDayOfMonth, 'day')) {
    dates.push(currentDate.toDate())
    currentDate = currentDate.add(1, 'day')
  }

  return dates
}
