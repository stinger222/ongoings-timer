import { checkCardSuitability } from './../../utils/stringUtils';
import { Week } from './../../utils/dateTimeUtils';

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createChecklist } from '../../utils/reduxUtils';

import { deauthorize } from './authReducer';
import { RootState } from '../store';

import { DEV_destributedData, Trello } from './../../constants/constants';
import { INewCardData, ITrelloCardData } from './../../types/Trello';

const __DEV__ = process.env.NODE_ENV === "development"

interface ICardsState {
	distributedData: Array<Array<ITrelloCardData>> | [],
	isPending: boolean
}

const initialState: ICardsState = {
	isPending: false,
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: __DEV__ ? DEV_destributedData : [[],[],[],[],[],[],[]]
}

export const fetchCardsData = createAsyncThunk(
  "cardsReducer/fetchCardsData",
	async (_, { dispatch, rejectWithValue, getState}) => {
    const state = getState() as RootState
    const { trelloKey, trelloToken, selectedList } = state.authReducer

		try {
			const response = await fetch(`https://api.trello.com/1/lists/${selectedList?.id}/cards/?key=${trelloKey}&token=${trelloToken}`)
			const data = await response.json()
			dispatch(distributeCards(data))
		} catch (err) {
			if (err?.message.includes("expired token")) {
				dispatch(deauthorize())
			}
			return rejectWithValue(err)
		}
	}
)

export const completeLastCheckItem = createAsyncThunk(
	"cardsReducer/completeLastCheckItem",
	async (cardData: ITrelloCardData, { dispatch, rejectWithValue, getState }) => {
    const state = getState() as RootState
    const { trelloKey, trelloToken } = state.authReducer

		try {
			// getting checkItems, searching for first incomplete checkItem and getting it's id
			const checkItems = await (await fetch(
				`https://api.trello.com/1/checklists/${cardData.checklistId}/checkItems?key=${trelloKey}&token=${trelloToken}`
			)).json()
			checkItems.sort((a, b) => a.pos - b.pos)
			
			const targetCheckItemId = checkItems.find((i) => i.state === 'incomplete')?.id

			if (!targetCheckItemId) throw new Error('All checkitems is completed or there is no checklist in this card.\n')

			// completing targetCheckItem
			const success = (await(await fetch(
				`https://api.trello.com/1/cards/${cardData.cardId}/checkItem/${targetCheckItemId}?state=complete&key=${trelloKey}&token=${trelloToken}`,
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

export const createCard = createAsyncThunk(
  "cardsReducer/createCard",
	async (newCard: INewCardData, { dispatch, rejectWithValue }) => {
   	try {
      const onCreationSuccess = async (createdCard) => {
        console.log('\nCard created successfully!')

        await createChecklist(createdCard.id, "Серии", newCard.length, newCard.watched)
				dispatch(clearDistributedCards())
				dispatch(fetchCardsData())
      }

      Trello.post('/cards/', newCard, onCreationSuccess)
		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

export const removeCard = createAsyncThunk(
  "cardsReducer/removeCard",
	async (
    cardToRemove: Pick<ITrelloCardData, "cardId" | "cardDayId">,
    { dispatch, rejectWithValue }
  ) => {
   	try {
			Trello.delete(`/cards/${cardToRemove.cardId}`).then(() => {
				console.log('Card deleted successfully!')
				
				dispatch(removeCardFromState({...cardToRemove}))
			}).catch((err) => {
				console.error('Can\'t delete card. Trello resonded with status code: ' + err.status)
				console.error('Response message: ', err.responseText)
				rejectWithValue(err)
			})
			
		} catch (err) {
			return rejectWithValue(err)
		}
	}
)

const cardsReducer = createSlice({
	name: "cardsReducer",
	initialState,
	reducers: {
		distributeCards(state: ICardsState, action: PayloadAction<object[]>)  {
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
    clearDistributedCards(state: ICardsState) {
      state.distributedData = [[],[],[],[],[],[],[]]
    },
		updateCard(
      state: ICardsState,
      action: PayloadAction<Pick<ITrelloCardData, "checkItemsChecked" | "cardId" | "cardDayId">>
    ) {
			const dayId = action.payload.cardDayId
			const card: ITrelloCardData = state.distributedData[dayId].find(card => card.cardId === action.payload.cardId)

			Object.entries(action.payload).forEach((a) => {
				card[a[0]] = a[1]
			})
		},
		removeCardFromState(
      state: ICardsState,
      action: PayloadAction<Pick<ITrelloCardData, "cardId" | "cardDayId">>
    ) {
			state.distributedData[action.payload.cardDayId] = state.distributedData[action.payload.cardDayId].filter((card: ITrelloCardData) => {
				return card.cardId !== action.payload.cardId
			})
		}}, 
    extraReducers: (builder) => {
		builder.addCase(fetchCardsData.pending, (state) => {
			state.isPending = true
		})
		builder.addCase(fetchCardsData.fulfilled, (state) => {
			state.isPending = false
		})
		builder.addCase(fetchCardsData.rejected, (state, action: PayloadAction<{message?: string}>) => {
			state.isPending = false
			console.error("Can't load data from trello!!");
			console.error(action?.payload?.message)
		})

		builder.addCase(completeLastCheckItem.fulfilled, () => {
			console.log('Marked as watched successfully.')
		})
		builder.addCase(completeLastCheckItem.rejected, (state, action: PayloadAction<any>) => {
			console.error(action.payload)
		})
	}
})

export const { distributeCards, clearDistributedCards, updateCard, removeCardFromState } = cardsReducer.actions

export default cardsReducer.reducer
