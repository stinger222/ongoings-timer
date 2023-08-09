import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActiveMenu, IUIState } from "../../types/redux";

const todayId = new Date().getDay()

const initialState: IUIState = {
	selectedDay: todayId,
	today: todayId,
  isDropdownOpen: false,
  dropdownActiveMenu: 'main'
}

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		selectDay(state: IUIState, action: PayloadAction<number>)  {
			state.selectedDay = action.payload
		},
    setActiveMenu(state: IUIState, action: PayloadAction<ActiveMenu>) {
      state.dropdownActiveMenu = action.payload
    },
    setDropdownState(state: IUIState, action: PayloadAction<boolean>) {
      state.isDropdownOpen = action.payload
    }
	}
})

export const { selectDay, setActiveMenu, setDropdownState } = uiSlice.actions

export default uiSlice.reducer
