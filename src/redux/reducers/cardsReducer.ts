import { ITrelloCardData } from './../../models/cardsModels';
import { createSlice } from "@reduxjs/toolkit";

interface ICardsState {
	distributedData: ITrelloCardData[]
}

const initialState: ICardsState = {
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: []
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