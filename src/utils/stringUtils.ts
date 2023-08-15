const extractDayAndTime = (cardName: string): [string, number, number] => {
  const splittedName = cardName.split(" - ")
  const dayAndTimePart = splittedName[splittedName.length-1] // if there is more than one " - " parts
  const splittedDayAndTime = dayAndTimePart.split(" ")

  const dayAbbr = splittedDayAndTime[0]
  const [ hours, minutes ] = splittedDayAndTime[1].split(":").map(i => Number(i))

  return [dayAbbr, hours, minutes]

}

export const checkCardSuitability = (cardName: string): boolean => {
  if (!/^.+ - [А-Я][а-я] [0-2][0-9]:[0-5][0-9]$/.test(cardName)) return false
  
  const [dayAbbr, hours, minutes] = extractDayAndTime(cardName)

  if (!['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].includes(dayAbbr)) return false
  if (hours >= 24) return false
  if (minutes >= 60) return false

  return true
}

// Capitalize first letter of each word if it's not jsut one letter
export const processTitle = (title: string): string => {
	return title.toLowerCase().trim()
		.replace(/(^[а-яА-Яa-zA-Z]|\s[а-яА-Яa-zA-Z])/g, s => s.toUpperCase())
		.replace(/\s[а-яА-Яa-zA-Z]\s/g, s => s.toLowerCase())
		.replaceAll(/(?<=\s)(?:(?:(?:I[XV]|V?I{0,3})|X(?:L|C)|L?X{0,3}|C(?:D|M)|D?C{0,3}|M{0,3}))(?=$|\n)/gi,
			s => s.toUpperCase()
		)
}

export const formatNumber = (number: number): string => {
	return Math.abs(number).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}
