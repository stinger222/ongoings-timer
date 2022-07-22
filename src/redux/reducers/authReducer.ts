import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStoredValue, getStoredJSON } from "../../utils/hepler";
import Trello from "../../models/Trello";

interface IAuthState {
  isAuthorized: boolean,
  trelloToken: string | null,
  trelloKey: string | null,
	trelloBoards: [] | null,
	selectedBoardName: string | null,
	selectedBoardLists: [] | null
}
 
const initialState: IAuthState = {
  isAuthorized: false,
  trelloToken: null,
  trelloKey: null,
	trelloBoards: null,
	selectedBoardName: getStoredValue('selectedBoardName'),
	selectedBoardLists: getStoredJSON('selectedBoardLists')
}

export const fetchTrelloBoards = createAsyncThunk(
	"authReducer/fetchTrelloBoards",
	async (_, { dispatch, rejectWithValue}) => {
		try {
			Trello.get("/members/me/boards").then((boards: any) => {
				dispatch(setBoards(boards))
			})

		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

export const fetchSelectedBoardLists = createAsyncThunk(
	"authReducer/fetchSelectedBoardLists",
	async (boardId: string, { dispatch, rejectWithValue }) => {
		try {
			Trello.get(`/boards/${boardId}/lists`).then((lists: any) => {
				console.log("LISTS", lists);
				dispatch(setSelectedBoardLists(lists))
			})

		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

const authReducer = createSlice({
	name: "authReducer",
	initialState,
	reducers: {
		authorize(state: IAuthState) {
      state.trelloToken =  Trello.token()
      state.trelloKey = Trello.key()

      if (state.trelloKey && state.trelloToken) {
        state.isAuthorized = true
      }
    },
		deauthorize(state: IAuthState) {
      state.trelloKey = null
      state.trelloToken = null
      state.isAuthorized = false;

      Trello.deauthorize()
    },
		setBoards(state: IAuthState, action: any) {
			state.trelloBoards = action.payload
		},
		setSelectedBoardLists(state: IAuthState, action: any) {
			state.selectedBoardLists = action.payload
			localStorage.setItem('selectedBoardLists', JSON.stringify(action.payload))
		},
		selectBoard(state: IAuthState, action: any) {
			state.selectedBoardName = action.payload
			localStorage.setItem('selectedBoardName', action.payload)
		}
	}
})

export const {
	authorize,
	deauthorize,
	setBoards,
	selectBoard,
	setSelectedBoardLists
} = authReducer.actions

export default authReducer.reducer