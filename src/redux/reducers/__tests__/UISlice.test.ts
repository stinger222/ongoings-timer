import { mockRootState } from "../../../constants/constants"
import UISlice, { selectDay, setActiveMenu, setDropdownState } from "../UISlice"

describe("Testing UISlice reducers", () => {
  it("Should select passed day id", () => {
    const initialState = mockRootState.UIReducer
    expect(initialState.selectedDay).toBe(3)

    let newState = UISlice(initialState, selectDay(0))
    expect(newState.selectedDay).toBe(0)
    
    newState = UISlice(newState, selectDay(6))
    expect(newState.selectedDay).toBe(6)

    newState = UISlice(newState, selectDay(1))
    expect([0,2,3,4,5,6]).not.toContain(newState.selectedDay)
  })

  it("Should open/close dropdown menu", () => {
    const initialState = mockRootState.UIReducer
    expect(initialState.isDropdownOpen).toBe(false)
    
    let newState = UISlice(initialState, setDropdownState(true))
    expect(newState.isDropdownOpen).toBe(true)

    newState = UISlice(newState, setDropdownState(true))
    expect(newState.isDropdownOpen).toBe(true)

    newState = UISlice(newState, setDropdownState(false))
    expect(newState.isDropdownOpen).toBe(false)

    newState = UISlice(newState, setDropdownState(false))
    expect(newState.isDropdownOpen).toBe(false)
    
    newState = UISlice(newState, setDropdownState())
    expect(newState.isDropdownOpen).toBe(true)

    newState = UISlice(newState, setDropdownState())
    expect(newState.isDropdownOpen).toBe(false)
  })

  it("Should change active menu", () => {
    const initialState = mockRootState.UIReducer
    expect(initialState.dropdownActiveMenu).toBe("main")
    
    let newState = UISlice(initialState, setActiveMenu("add_card"))
    expect(newState.dropdownActiveMenu).toBe("add_card")

    newState = UISlice(initialState, setActiveMenu("trello_settings")) // Which is impossible btw...
    expect(newState.dropdownActiveMenu).toBe("trello_settings")

    newState = UISlice(initialState, setActiveMenu("trello_settings"))
    expect(newState.dropdownActiveMenu).toBe("trello_settings")

    newState = UISlice(initialState, setActiveMenu("main"))
    expect(newState.dropdownActiveMenu).toBe("main")
  })
})