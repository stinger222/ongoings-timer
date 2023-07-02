import { formatNumber } from "./stringUtils"

// this function takes ammount of seconds as a parameter
// and returns string with days, hours, minutes and seconds
// that fits inside given ammount of seconds

export const formatTimeDuration = (difference: number): string => {
  const isNegative = difference < 0
  difference = Math.abs(difference)

  const days = formatNumber(Math.floor(difference / 86400))
  difference %= 86400

  const hours = formatNumber(Math.floor(difference / 3600))
  difference %= 3600

  const minutes = formatNumber(Math.floor(difference / 60))
  difference %= 60

  const seconds = formatNumber(difference)

  // -5:56:59
  if (isNegative) return `-${hours}:${minutes}:${seconds}`
  
  // 6:20:50:05
  return `${days}:${hours}:${minutes}:${seconds}`
}

export class Week {
	public static week = [
		"вс", "пн", "вт", "ср", "чт", "пт", "сб"
	]

	public static getIdByDay = (day: string): number => {
		return this.week.findIndex((dayCondidate: string) => day === dayCondidate)
	}

	public static getIdByName = (name: string): number => {
		return Week.week.findIndex((day: string) => (
			name.toLowerCase().includes(day)
		))
	}

	public static getDayById = (id: number):string => {
		return this.week[id]
	}
}
