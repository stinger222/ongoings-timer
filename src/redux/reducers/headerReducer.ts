import { createSlice } from "@reduxjs/toolkit";

const todayId = new Date().getDay()

type ActiveMenu = 'main' | 'trello_settings' | 'add_card'
interface IHeaderState {
  selectedDay: number,
  today: number,
  isDropdownOpen: boolean,
  dropdownActiveMenu: ActiveMenu
} 

const initialState: IHeaderState = {
	selectedDay: todayId,
	today: todayId,
  isDropdownOpen: false,
  dropdownActiveMenu: 'main'
}

const headerReducer = createSlice({
	name: "headerReducer",
	initialState,
	reducers: {
		selectDay(state: IHeaderState, action: any)  {
			state.selectedDay = action.payload
		},
    setActiveMenu(state: IHeaderState, action: any) {
      state.dropdownActiveMenu = action.payload
    },
    setDropdownState(state: IHeaderState, action: any) {
      state.isDropdownOpen = action.payload
    }
	}
})

export const { selectDay, setActiveMenu, setDropdownState } = headerReducer.actions

export default headerReducer.reducer