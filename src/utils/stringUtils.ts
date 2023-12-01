import { ICheckCardSuitability, IExtractDayAndTime, IProcessCardTitle } from "../types/utils"
import { Week } from "./dateTimeUtils"

/**
 * Used to pull out data from the card name 
 * 
 * @param cardName Full name of the card
 * @returns Array of 3 elemets: `day abbreviation string`, as well as parsed into numbers `hours` and `minutes`
*/
export const extractDataFromCardName: IExtractDayAndTime = (cardName) => {
  if (!/^.+ - [а-яА-Я][а-яА-Я] [0-2][0-9]:[0-5][0-9]$/.test(cardName)) return [null, null, null, null]

  const splittedName = cardName.split(" - ")
  const dayAndTimePart = splittedName.pop() // if there is more than one " - " parts

  const cardTitle = splittedName.join(" - ")
  const splittedDayAndTime = dayAndTimePart.split(" ")

  const dayAbbr = splittedDayAndTime[0].toLowerCase()
  const [ hours, minutes ] = splittedDayAndTime[1].split(":").map(i => Number(i))

  return [cardTitle, dayAbbr, hours, minutes]
}

/**
 * Checks if data in the card name is `actually` valid
 * 
 * @param cardName Full name of the card
 * @returns boolean
*/
export const checkCardSuitability: ICheckCardSuitability = (cardName): boolean => {
  if (!/^.+ - [а-яА-Я][а-яА-Я] [0-2][0-9]:[0-5][0-9]$/.test(cardName)) return false
  
  const [_, dayAbbr, hours, minutes] = extractDataFromCardName(cardName)

  if (!Week.daysAbbr.includes(dayAbbr)) return false
  if (hours >= 24) return false
  if (minutes >= 60) return false

  return true
}

/**
 * Capitalizes first letter of each word if it's not jsut one letter
 * @param cardTitle Only `first part` of the whole card name (without day and time)
 * @returns Processed title
*/
export const processCardTitle: IProcessCardTitle = (cardTitle) => {
	return cardTitle.toLowerCase().trim()
		.replace(/(^[а-яА-Яa-zA-Z]|\s[а-яА-Яa-zA-Z])/g, s => s.toUpperCase())
		.replace(/\s[а-яА-Яa-zA-Z]\s/g, s => s.toLowerCase())
		.replaceAll(/(?<=\s)(?:(?:(?:I[XV]|V?I{0,3})|X(?:L|C)|L?X{0,3}|C(?:D|M)|D?C{0,3}|M{0,3}))(?=$|\n)/gi,
			s => s.toUpperCase()
		)
}

/** Converts number to formatted string version with 2 digits (5 -> "05")*/
export const formatNumber = (number: number): string => {
	return Math.abs(number).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}
