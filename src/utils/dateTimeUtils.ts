import { formatNumber } from "./stringUtils"

// this function takes ammount of seconds as a parameter
// and returns string with days, hours, minutes and seconds
// that fits inside given ammount of seconds

export const formatTimeDuration = (difference: number): string => {
  const isNegative = difference < 0
  difference = Math.ceil(Math.abs(difference))

  const days = formatNumber(Math.floor(difference / 86400))
  difference %= 86400

  const hours = formatNumber(Math.floor(difference / 3600))
  difference %= 3600

  const minutes = formatNumber(Math.floor(difference / 60))
  difference %= 60

  const seconds = formatNumber(difference)

  // e.g. -05:56:59
  if (isNegative) return `-${hours}:${minutes}:${seconds}`
  
  // e.g. 6:20:50:05
  return `${days}:${hours}:${minutes}:${seconds}`
}

export class Week {
	public static daysAbbr = [
		"вс", "пн", "вт", "ср", "чт", "пт", "сб"
	]

	public static getIdByDay = (day: string): number => {
    day = day?.toLowerCase?.()
    return this.daysAbbr.findIndex((dayCondidate: string) => day === dayCondidate)
	}

	public static getIdByCardName = (name: string): number => {
		return Week.daysAbbr.findIndex((day: string) => (
			name?.toLowerCase().includes(day)
		))
	}
}
