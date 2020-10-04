import dayjs from 'dayjs'

export const useFormatDate = (
  date: string,
  dateOrder: string
): { formattedDate: string } => {
  const formattedDate = dayjs(date).format(dateOrder)
  return { formattedDate }
}
