export const checkCardSuitability = (cardName: string): boolean => {
  return /.*\s[-]\s[А-Я][а-я]\s[0-9]{2}[:][0-9]{2}$/.test(cardName)
}

// Capitalize first letter of each word if it's not jsut one letter
export const processTitle = (title: string): string => {
	return title.toLowerCase().trim()
		.replace(/(^[а-яА-Яa-zA-Z]|\s[а-яА-Яa-zA-Z])/g, s => s.toUpperCase())
		.replace(/\s[а-яА-Яa-zA-Z]\s/g, s => s.toLowerCase())
		.replaceAll(/\s[x]|[ix]|[viii]|[vii]|[vi]|[v]|[iv]|[iii]|[ii]|[i]/gi,
			s => s.toUpperCase()
		)
}

export const formatNumber = (number: number): string => {
	return Math.abs(number).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}
