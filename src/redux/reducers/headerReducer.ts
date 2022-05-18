import { createSlice } from "@reduxjs/toolkit";

const todayId = new Date().getDay()

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
		},
		defineToday(state: any, action: any)  {
			state.todayIs = action.payload
		}
	}
})

export const {selectDay, defineToday} = headerReducer.actions

export default headerReducer.reducer