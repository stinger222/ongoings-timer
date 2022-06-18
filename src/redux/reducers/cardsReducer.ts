import { ITrelloCardData } from './../../models/cardsModels';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// const config = require('config');

interface ICardsState {
	distributedData: Array<Array<ITrelloCardData>> | [],
	isPending: boolean
}


const initialState: ICardsState = {
	isPending: false,
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: [
		[],
		[],
		[],
		[],
		[],
		[],
		[
			{
				checkItems: 99,
				checkItemsChecked: 93,
				checklistId: "sldfkfjs#(*98342",
				cardTitle: "Перестану Быть Героем - Вт 20:00",
				cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
				cardUrl: "Trello card url here",
				cardId: "sdlkfj290dsflkj234"
			},{
				checkItems: 13,
				checkItemsChecked: 2,
				checklistId: "sldkfhjs#(*98342",
				cardTitle: "Перестану Быть Героем - Вт 20:00",
				cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
				cardUrl: "Trello card url here",
				cardId: "sdlkfj9sd0dsflkj234"
			},{
				checkItems: 13,
				checkItemsChecked: 2,
				checklistId: "sldkfjfds#(*98342",
				cardTitle: "Перестану Быть Героем - Вт 20:00",
				cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
				cardUrl: "Trello card url here",
				cardId: "sdlkfjsadf90dflkj234"
			}]
	]
}

const api_key = process.env.REACT_APP_API_KEY
const token = process.env.REACT_APP_API_TOKEN

export const fetchCardsData = createAsyncThunk(
	"cardsReducer/fetchCardsData",
	async (_, { dispatch, rejectWithValue }) => {
		try {
			const response = await fetch(`https://api.trello.com/1/lists/6183f62d391703028ab27218/cards/?key=${api_key}&token=${token}`)
			const data = await response.json()
			dispatch(distributeCards(data))
		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

const weekDays = [
	"вс", "пн", "вт", "ср", "чт", "пт", "сб"
]

const cardsReducer = createSlice({
	name: "cardsReducer",
	initialState,
	reducers: {
		distributeCards(state: ICardsState, action: any)  {

			action.payload.forEach((card: any) => {
				const cardDayId = weekDays.findIndex((day:string, id:number) => {
					return card.name.toLowerCase().includes(day)
				})
				
				state.distributedData[cardDayId].push({
					checkItems: card.badges.checkItems,
					checkItemsChecked: card.badges.checkItemsChecked,
					checklistId: card.idChecklists[0],
					cardTitle: card.name,
					cardDesc: card.desc,
					cardUrl: card.url,
					cardId: card.id
				})
			})
		}
	}, extraReducers: (builder) => {
		builder.addCase(fetchCardsData.pending, (state) => {
			state.isPending = true
		})

		builder.addCase(fetchCardsData.fulfilled, (state) => {
			state.isPending = false
		})

		builder.addCase(fetchCardsData.rejected, (state, action: any) => {
			console.error("ERROR OCCURRED!!"); // stub
			console.error(action.payload)
			state.isPending = false
		})
	}
})

export const { distributeCards } = cardsReducer.actions

export default cardsReducer.reducer