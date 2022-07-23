export const getStoredValue = (key: string) => {
	return localStorage.getItem(key) || null
}

export const getStoredJSON = (key: string) => {
	const storedValue = localStorage.getItem(key)
	
	if (storedValue && storedValue != '') {
		return JSON.parse(storedValue)
	}
	return null
}

export const checkCardSuitability = (cardName: string): boolean => {
  return /.*\s[-]\s[А-Я][а-я]\s[0-9]{2}[:][0-9]{2}$/.test(cardName)
}