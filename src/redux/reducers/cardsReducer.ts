import { ITrelloCardData } from './../../models/cardsModels';
import { createSlice } from "@reduxjs/toolkit";

interface ICardsState {
	distributedData: ITrelloCardData[]
}

const initialState: ICardsState = {
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: [
		// dummy data
		{
			checkItems: 13,
			checkItemsChecked: 2,
			checklistId: "sldkfjs#(*98342",
			cardTitle: "Перестану Быть Героем - Вт 20:00",
			cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
			cardUrl: "Trello card url here",
			cardId: "sdlkfj90dsflkj234"
		}
	]
}

const cardsReducer = createSlice({
	name: "cardsReducer",
	initialState,
	reducers: {
		distributeCard(state: any, action: any)  {
			state.distributedData[action.payload.dayId] = action.payload.cardData
		}
	}
})

export const { distributeCard } = cardsReducer.actions

export default cardsReducer.reducer