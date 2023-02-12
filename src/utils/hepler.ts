import Trello from "../models/Trello"

export const getStoredValue = (key: string) => {
	return localStorage.getItem(key) || null
}

export const getStoredJSON = (key: string) => {
	const storedValue = localStorage.getItem(key)?.trim()
	
	if (storedValue && storedValue != '') {
		return JSON.parse(storedValue)
	}
	return null
}

export const checkCardSuitability = (cardName: string): boolean => {
  return /.*\s[-]\s[А-Я][а-я]\s[0-9]{2}[:][0-9]{2}$/.test(cardName)
}

const createCheckItems = (checklistId: string, checkItemsCount: number) => {
  const promise = new Promise((resolve: any) => {    
    for (let i = 0; i < checkItemsCount; i++) {
      setTimeout(() => {
      	Trello.post(`/checklists/${checklistId}/checkItems?name=${i+1}&pos=${(i+1)*16384}`)
      }, 80 * i)
    }

    setTimeout(() => resolve(), 80 * checkItemsCount + 600)
  })
  return promise
}

const completeCheckItems = (checklistId: string, cardId: string, toCheck: number) => {
	const promise = new Promise(async (resolve: any) => {
		const checkItems = await Trello.get(`/checklists/${checklistId}/checkItems`)
		checkItems.sort((a: any, b: any) => a.pos - b.pos)

		for (let i = 0; i < toCheck; i++) {
			setTimeout(() => {
				Trello.put(`cards/${cardId}/checkItem/${checkItems[i].id}?state=complete`).catch((err: any) => {
					console.error('Can\'t complete checkitem!! ', err)
				})
			}, 80 * i + 1000)
		}
		
		setTimeout(() => resolve(), 80 * toCheck)
	})

	return promise
}

export const createChecklist = async (
  cardId: string, checklistName: string = 'Серии', length: number, toCheck: number
) => {
	const promise = new Promise(async (resolve: any) => {
		const createdChecklist = await Trello.post(`/checklists?idCard=${cardId}&name=${checklistName}`)
		console.log('Checklist created successfully!\n\n')
		
		console.log('Creating checkItems....')
		await createCheckItems(createdChecklist.id, length)
		console.log('All checkItems created!\n\n')

		console.log('Completing first '+ toCheck +" checkItems...");
		await completeCheckItems(createdChecklist.id, cardId, toCheck)
		console.log('CheckItems completed!');
		resolve()
	})

	return promise
}

// Capitalize first letter of each word if word is not jsut one letter
export const processTitle = (title: string): string => {
	return title.toLowerCase().trim()
		.replace(/(^[а-яА-Яa-zA-Z]|\s[а-яА-Яa-zA-Z])/g, s => s.toUpperCase())
		.replace(/\s[а-яА-Яa-zA-Z]\s/g, s => s.toLowerCase())
		.replaceAll(/\s[x]|[ix]|[viii]|[vii]|[vi]|[v]|[iv]|[iii]|[ii]|[i]/gi,
			s => s.toUpperCase()
		)
}