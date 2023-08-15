import { getStoredJSON } from '../../utils/localStorageUtils';
import { storageKeys, Trello } from "../../constants/constants";
import { ITrelloBoard, ITrelloList } from "../../types/Trello";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthorized: boolean,
  trelloToken: string | null,
  trelloKey: string | null,
	trelloBoards: any[] | null,
	selectedBoard: ITrelloBoard | null,
	selectedBoardLists: ITrelloList[] | null
	selectedList: ITrelloList | null
}

const initialState: IAuthState = {
  isAuthorized: false,
  trelloToken: null,
  trelloKey: null,
	trelloBoards: null,
	selectedBoard: getStoredJSON('selectedBoard'),
	selectedBoardLists: null,
	selectedList: getStoredJSON('selectedList')
}

export const fetchTrelloBoards = createAsyncThunk<unknown>(
	"auth/fetchTrelloBoards",
	async (_, thunkAPI) => {
		try {
			let boards: any[] = await Trello.get("/members/me/boards")

      const mappedBoards = boards.map<ITrelloBoard>((board: any): ITrelloBoard => ({
        id: board.id,
        name: board.name,
      })) 

      thunkAPI.dispatch(setBoards(mappedBoards))
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const fetchSelectedBoardLists = createAsyncThunk(
	"auth/fetchSelectedBoardLists",
	async (boardId: string, thunkAPI) => {
		try {
			const lists = await Trello.get(`/boards/${boardId}/lists`)
      thunkAPI.dispatch(setSelectedBoardLists(lists))

		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const authSlice = createSlice({
	name: "auth",
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
			state.isAuthorized = false
			state.trelloToken = null
			state.trelloKey = null
			state.trelloBoards = null
			state.selectedBoard = null
			state.selectedBoardLists = null
			state.selectedList = null

			Object.keys(storageKeys).forEach(key => {
				localStorage.removeItem(key)
			})

      Trello.deauthorize()
			globalThis.document.location.reload()
    },

		setBoards(state: IAuthState, action: PayloadAction<ITrelloBoard[]>) {
			state.trelloBoards = action.payload ?? null
		},
		setSelectedBoardLists(state: IAuthState, action: PayloadAction<ITrelloList[]>) {
			state.selectedBoardLists = action.payload ?? null
		},
		selectBoard(state: IAuthState, action: PayloadAction<ITrelloBoard>) {
			state.selectedBoard = action.payload ?? null
			localStorage.setItem(storageKeys.selectedBoard, JSON.stringify(action.payload))
		},
		selectList(state: IAuthState, action: PayloadAction<ITrelloList>) {
			state.selectedList = action.payload ?? null
			localStorage.setItem(storageKeys.selectedList, JSON.stringify(action.payload))
		}
	}
})

export const {
	authorize, deauthorize,
	setBoards, selectBoard,
	selectList, setSelectedBoardLists
} = authSlice.actions

export default authSlice.reducer
