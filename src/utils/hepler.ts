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
	const createdCheckItems: any = []
  const promise = new Promise((resolve: any) => {    
    for (let i = 0; i < checkItemsCount; i++) {
      setTimeout(async () => {
        const createdCheckItem = await Trello.post(`/checklists/${checklistId}/checkItems?name=${i+1}`)
				createdCheckItems.push(createdCheckItem)
      }, 500 * i)
    }

    setTimeout(() => resolve(createdCheckItems), 500 * checkItemsCount + 1000)
  })
  return promise
}

const completeCheckItems = (checklistId: string, cardId: string, toCheck: number) => {
	const promise = new Promise(async (resolve: any) => {
		const checkItems = await Trello.get(`/checklists/${checklistId}/checkItems`)

		for (let i = 0; i < toCheck; i++) {
			Trello.put(`cards/${cardId}/checkItem/${checkItems[i].id}?state=complete`).catch((err: any) => {
				console.error(err)
			})
		}
		
		setTimeout(() => {
			console.log('CheckItems completed! I believe...\n\n')
			resolve()
		}, 500)
	})

	return promise
}

const renameCheckItems = (cardId: string, checkItems: any) => {
	const checklistId = checkItems?.[0].idChecklist
	console.log("checkItems, ", checkItems);
	
	for (let i = 0; i < checkItems.length; i++) {
		setTimeout(() => {
			Trello.put(`cards/${cardId}/checklist/${checklistId}/checkItem/${checkItems[i].id}`, {
				name: i+1
			})
		}, 200 * i)
	}
}

export const createChecklist = async (
  cardId: string, checklistName: string = 'Серии', length: number, toCheck: number
) => {
	const promise = new Promise(async (resolve: any) => {
		const createdChecklist = await Trello.post(`/checklists?idCard=${cardId}&name=${checklistName}`)

		console.log('Checklist created successfully!\n\n')
		console.log('Creating checkItems....')
		
		// вот тут залупа!!
		const createdCheckItems = await createCheckItems(createdChecklist.id, length)

		console.log('All checkItems created!\n\n')
		console.log('Completing first '+ toCheck +" checkItems...");
		
		await renameCheckItems(cardId, createdCheckItems)
		
		await completeCheckItems(createdChecklist.id, cardId, toCheck)
		resolve()

	})

	return promise
}

// Capitalize first letter of each word if word is not jsut one letter
export const processTitle = (title: string): string => {
	return title.toLowerCase().trim()
		.replace(/(^[а-яА-Яa-zA-Z]|\s[а-яА-Яa-zA-Z])/g, m => m.toUpperCase())
		.replace(/\s[а-яА-Яa-zA-Z]\s/g, m => m.toLowerCase())
}