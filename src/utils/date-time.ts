export const toLocalISOString = (inputDate) => {
  const date = new Date(inputDate)
  const offset = -date.getTimezoneOffset()
  const localTime = new Date(date.getTime() + offset * 60 * 1000)
  return localTime.toISOString()
}

/**
 * @description Converts JS day of the week indexes to ISO format
 * @param jsDayIndex day index in js format (0 - Sunday, etc)
 * @returns ISO day index (0 - Monday, etc)
 */
export const jsToIsoWeekday = (jsDayIndex: number) => (jsDayIndex + 6) % 7

/**
 * @description Reverse of `jsToIsoWeekday()` utility. Converts ISO day of the week indexes to JS format
 * @param jsDayIndex day index in ISO format (0 - Monday, etc)
 * @returns JS day index (0 - Sunday, etc)
 */
export const isoToJsWeekday = (isoDay: number) => (isoDay + 1) % 7
