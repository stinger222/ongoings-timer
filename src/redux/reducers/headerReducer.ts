import { createSlice } from "@reduxjs/toolkit";

const todayId = new Date().getDay()
// const todayId = 3

const initialState = {
	selectedDay: todayId,
	today: todayId
}

const headerReducer = createSlice({
	name: "headerReducer",
	initialState,
	reducers: {
		selectDay(state: any, action: any)  {
			state.selectedDay = action.payload
		}
	}
})

export const { selectDay } = headerReducer.actions

export default headerReducer.reducer