import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: []
}

const cardsReducer = createSlice({
	name: "headerReducer",
	initialState,
	reducers: {
		distributeCard(state: any, action: any)  {
			state.distributedData[action.payload.dayId] = action.payload.cardData
		}
	}
})

export const { distributeCard } = cardsReducer.actions

export default cardsReducer.reducer