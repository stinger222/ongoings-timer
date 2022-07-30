import { ITrelloBoard, ITrelloList, storageKeys } from './../../models/trelloModels';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStoredJSON } from "../../utils/hepler";
import Trello from "../../models/Trello";

interface IAuthState {
  isAuthorized: boolean,
  trelloToken: string | null,
  trelloKey: string | null,
	trelloBoards: [] | null,
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

export const fetchTrelloBoards = createAsyncThunk(
	"authReducer/fetchTrelloBoards",
	async (_, { dispatch, rejectWithValue}) => {
		try {
			Trello.get("/members/me/boards").then((boards: any) => {
        boards = boards.map((board: any) => {
          const _board = {
            id: board.id,
            name: board.name
          }

          return _board
        })

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
    },
		setBoards(state: IAuthState, action: any) {
			state.trelloBoards = action.payload
		},
		setSelectedBoardLists(state: IAuthState, action: any) {
			state.selectedBoardLists = action.payload
		},
		selectBoard(state: IAuthState, action: any) {
			state.selectedBoard = action.payload
			localStorage.setItem(storageKeys.selectedBoard, JSON.stringify(action.payload))
		},
		selectList(state: IAuthState, action: any) {
			state.selectedList = action.payload
			localStorage.setItem(storageKeys.selectedList, JSON.stringify(action.payload))
		}
	}
})

export const {
	authorize, deauthorize,
	setBoards, selectBoard,
	selectList, setSelectedBoardLists
} = authReducer.actions

export default authReducer.reducer