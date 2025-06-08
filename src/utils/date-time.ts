export const toLocalISOString = (inputDate) => {
  const date = new Date(inputDate)
  const offset = -date.getTimezoneOffset()
  const localTime = new Date(date.getTime() + offset * 60 * 1000)
  return localTime.toISOString()
}
