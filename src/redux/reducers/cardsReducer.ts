
import { ITrelloCardData } from './../../models/cardsModels';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Week } from '../../models/Week';
interface ICardsState {
	distributedData: Array<Array<ITrelloCardData>> | [],
	isPending: boolean
}

const initialState: ICardsState = {
	isPending: false,
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: [
		[], [], [], [
			{
				checkItems: 99,
				checkItemsChecked: 80,
				checklistId: "sldfsdfkfjs#d(*98342",
				cardTitle: "TEST CARD - Ср 20:00",
				cardDesc: `https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-03/thumbs/1648116177_1647531170_2.jpg`,
				cardUrl: "Trello card url here",
				cardId: "sdlkfjsdf290dsflkj234",
				cardDayId: 3
			},
			{
				checkItems: 24,
				checkItemsChecked: 0,
				checklistId: "62af03sdf21a6cbf503d8c21faaf",
				cardTitle: "TEST CARD - Ср 20:00",
				cardDesc: "https://amedia.online/1086-perestanu-byt-geroem.html\nhttps://amedia.online/uploads/posts/2022-01/thumbs/1641648826_1639565096_1.jpg",
				cardUrl: "https://trello.com/c/zD99O6FZ/872-test-card-%D0%B2%D1%82-2000",
				cardId: "62af0sd321a6cbsdff5038c21fas8f",
				cardDayId: 3
			}	
		], [], [], []
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

export const completeLastCheckItem = createAsyncThunk(
	"cardsReducer/completeLastCheckItem",
	async (cardData: ITrelloCardData, { dispatch, rejectWithValue }) => {
		try {
			// getting checkItems, searching for firs incomplete checkItem and getting it's id
			const checkItems = await (await fetch(
				`https://api.trello.com/1/checklists/${cardData.checklistId}/checkItems?key=${api_key}&token=${token}`
			)).json()
			const targetCheckItem = checkItems.find((i: any) => i.state === 'incomplete')?.id

			if (!targetCheckItem) throw new Error('All checkitems is completed or there is no checklist in this card.')

			// completing targetCheckItem
			const success = (await(await fetch(
				`https://api.trello.com/1/cards/${cardData.cardId}/checkItem/${targetCheckItem}?state=complete&key=${api_key}&token=${token}`,
				{	method: "PUT" }
			)).json()).state === 'complete'

			if (success) {
				dispatch(updateCard({
					cardDayId: cardData.cardDayId,
					cardId: cardData.cardId,
					checkItemsChecked: cardData.checkItemsChecked + 1
				}))
			} else throw new Error('Can\'t complete checkitem.')

		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

const cardsReducer = createSlice({
	name: "cardsReducer",
	initialState,
	reducers: {
		distributeCards(state: ICardsState, action: any)  {
			action.payload.forEach((card: any) => {
				const cardDayId = Week.getIdByName(card.name)

				state.distributedData[cardDayId].push({
					checkItems: card.badges.checkItems,
					checkItemsChecked: card.badges.checkItemsChecked,
					checklistId: card.idChecklists[0],
					cardTitle: card.name,
					cardDesc: card.desc,
					cardUrl: card.url,
					cardId: card.id,
					cardDayId: Week.getIdByName(card.name)
				})
			})
		},
		updateCard(state: ICardsState, action: any) {
			const dayId = action.payload.cardDayId
			const card: any = state.distributedData[dayId].find(card => card.cardId === action.payload.cardId)

			Object.entries(action.payload).forEach((a: any) => {
				card[a[0]] = a[1]
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

		builder.addCase(completeLastCheckItem.fulfilled, (state, action: any) => {
			console.log('Marked as watched successfully.')
		})
		builder.addCase(completeLastCheckItem.rejected, (state, action: any) => {
			console.error(action.payload)
		})
		
	}
})

export const { distributeCards, updateCard } = cardsReducer.actions

export default cardsReducer.reducer