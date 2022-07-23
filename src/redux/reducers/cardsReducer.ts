
import { DEV_destributedData, ITrelloCardData } from './../../models/trelloModels';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../store';
import { Week } from '../../models/Week';
import { checkCardSuitability } from '../../utils/hepler';

const IS_DEV = process.env.NODE_ENV === "development"

interface ICardsState {
	distributedData: Array<Array<ITrelloCardData>> | [],
	isPending: boolean
}

const initialState: ICardsState = {
	isPending: false,
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: IS_DEV ? DEV_destributedData : [[],[],[],[],[],[],[]]
}

export const fetchCardsData = createAsyncThunk(
  "cardsReducer/fetchCardsData",
	async (_, { dispatch, rejectWithValue, getState}) => {
    const state = getState() as RootState
    const {trelloKey, trelloToken, selectedList} = state.authReducer

		try {
			const response = await fetch(`https://api.trello.com/1/lists/${selectedList?.id}/cards/?key=${trelloKey}&token=${trelloToken}`)
			const data = await response.json()
			dispatch(distributeCards(data))
		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

export const completeLastCheckItem = createAsyncThunk(
	"cardsReducer/completeLastCheckItem",
	async (cardData: ITrelloCardData, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState
    const {trelloKey, trelloToken} = state.authReducer

		try {
			// getting checkItems, searching for firs incomplete checkItem and getting it's id
			const checkItems = await (await fetch(
				`https://api.trello.com/1/checklists/${cardData.checklistId}/checkItems?key=${trelloKey}&token=${trelloToken}`
			)).json()
			const targetCheckItem = checkItems.find((i: any) => i.state === 'incomplete')?.id

			if (!targetCheckItem) throw new Error('All checkitems is completed or there is no checklist in this card.\n')

			// completing targetCheckItem
			const success = (await(await fetch(
				`https://api.trello.com/1/cards/${cardData.cardId}/checkItem/${targetCheckItem}?state=complete&key=${trelloKey}&token=${trelloToken}`,
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
      const validCards = action.payload.filter((card: any) => {
        return checkCardSuitability(card.name)
      })

      if (validCards.length === 0) {
        throw new Error("Cards in selected list doesn't match required pattern.")
      }
      
			validCards.forEach((card: any) => {
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
		}}, 
    extraReducers: (builder) => {
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