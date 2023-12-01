import { IFormatTimeDuration, IWeek } from "../types/utils"
import { formatNumber, extractDataFromCardName } from "./stringUtils"

/** 
  * @param difference Some ammount of seconds
  * @returns String with days, hours, minutes and seconds that fits inside given ammount of seconds
 */
export const formatTimeDuration: IFormatTimeDuration = (difference) => {
  const isNegative = difference < 0
  difference = Math.ceil(Math.abs(difference))

  const days = formatNumber(Math.floor(difference / 86400))
  difference %= 86400

  const hours = formatNumber(Math.floor(difference / 3600))
  difference %= 3600

  const minutes = formatNumber(Math.floor(difference / 60))
  difference %= 60

  const seconds = formatNumber(difference)

  // e.g. -01:56:59
  if (isNegative) return `-${hours}:${minutes}:${seconds}`
  
  // e.g. 6:20:50:05
  return `${days}:${hours}:${minutes}:${seconds}`
}

export const Week: IWeek = class {
	public static daysAbbr = [
		"вс", "пн", "вт", "ср", "чт", "пт", "сб"
	]
  
  /**
   * @param abbr one of the `Week.daysAbbr`
   * @returns Index of given day abbreviation in the week. Вс - 0, Пн - 1, etc.
  */
	public static getIdByAbbr = (abbr) => {
    abbr = abbr?.toLowerCase?.()
    return this.daysAbbr.findIndex((dayCondidate) => abbr === dayCondidate)
	}

  /**
   * @param name Full name of the card
   * @returns Index of the day of the week that this card points to. Вс - 0, Пн - 1, etc.
  */
	public static getIdByCardName = (name) => {
    const [_, dayAbbr] = extractDataFromCardName(name)
    
		return Week.daysAbbr.findIndex((day) => dayAbbr === day)
	}
}
