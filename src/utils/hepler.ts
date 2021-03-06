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
  const creationPromise = new Promise((resolve: any) => {    
    for (let i = 1; i <= checkItemsCount; i++) {
      setTimeout(() => {
        Trello.post(`/checklists/${checklistId}/checkItems?name=${i}`)
      }, 400 * i)
    }

    setTimeout(() => resolve(), 400 * (checkItemsCount+2))
  })
  return creationPromise
}

const completeCheckItems = async (checklistId: string, cardId: string, toCheck: number) => {
	const promise = new Promise((resolve: any) => {

		Trello.get(`/checklists/${checklistId}/checkItems`).then((checkItems: any) => {
			for (let i = 0; i < toCheck; i++) {
				Trello.put(`cards/${cardId}/checkItem/${checkItems[i].id}?state=complete`).catch((err: any) => {
					console.error(err)
				})
			}
			setTimeout(() => {
				console.log('CheckItems completed! (I believe...)\n\n')
				resolve()
			}, 500)
		})
	})

	return promise
}

export const createChecklist = (
  cardId: string, checklistName: string = 'Серии', length: number, toCheck: number
) => {
	const promise = new Promise((resolve: any) => {
		Trello.post(`/checklists?idCard=${cardId}&name=${checklistName}`).then((createdChecklist: any) => {
			console.log('Checklist created successfully!\n\n')
			console.log('Creating checkItems....')
			
			createCheckItems(createdChecklist.id, length).then(() => {
				console.log('All checkItems created!\n\n')
				console.log('Completing first '+ toCheck +" checkItems...");
				
				completeCheckItems(createdChecklist.id, cardId, toCheck).then(() => {
					resolve()
				})
			})
		})
	})

	return promise
}