import { Trello } from "../constants/constants"
import { ICompleteCheckItems, ICreateCheckItems, ICreateChecklist } from "../types/utils"

const createCheckItems: ICreateCheckItems = (checklistId, checkItemsCount) => {
  const promise = new Promise<void>((resolve) => {    
    for (let i = 0; i < checkItemsCount; i++) {
      setTimeout(() => {
      	Trello.post(`/checklists/${checklistId}/checkItems?name=${i+1}&pos=${(i+1) * 16384}`)
      }, 80 * i)
    }

    setTimeout(() => resolve(), 80 * checkItemsCount + 600)
  })
  return promise
}

const completeCheckItems: ICompleteCheckItems = (checklistId, cardId, toCheck) => {
	const promise = new Promise<void>(async (resolve) => {
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

export const createChecklist: ICreateChecklist = async (
  cardId, checklistName = 'Серии', length, toCheck
) => {
	const promise = new Promise<void>(async (resolve) => {
		const createdChecklist = await Trello.post(`/checklists?idCard=${cardId}&name=${checklistName}`)
		console.log('Checklist created successfully!\n\n')
		
		console.log('Creating checkItems....')
		await createCheckItems(createdChecklist.id, length)
		console.log('All checkItems created!\n\n')

		console.log(`Completing first ${toCheck} checkItems...`);
		await completeCheckItems(createdChecklist.id, cardId, toCheck)
		console.log('CheckItems completed!');
		resolve()
	})

	return promise
}
