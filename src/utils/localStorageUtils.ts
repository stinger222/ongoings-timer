export const getStoredValue = (key: string): string | null  => {
	return localStorage.getItem(key) || null
}

export const getStoredJSON = (key: string) => {
	const storedValue = localStorage.getItem(key)?.trim()
	
	if (storedValue && storedValue !== '') {
		return JSON.parse(storedValue)
	}
	return null
}
