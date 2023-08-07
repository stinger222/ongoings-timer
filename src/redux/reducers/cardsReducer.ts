import { checkCardSuitability } from './../../utils/stringUtils';
import { Week } from './../../utils/dateTimeUtils';

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createChecklist } from '../../utils/reduxUtils';

import { deauthorize } from './authReducer';
import { RootState } from '../store';

import { mockDestributedData } from './../../constants/constants';
import { ITrelloCardData } from './../../types/Trello';
import { ICardsReducerState, ICreateCardThunkProps, IRemoveCardThunkProps } from '../../types/redux';

const __DEV__ = process.env.NODE_ENV === "development"

const initialState: ICardsReducerState = {
	isPending: false,
	// Array index represents day of the week (0 - Sunday, 6 - Saturday)
	distributedData: __DEV__ ? mockDestributedData : [[],[],[],[],[],[],[]]
}

export const fetchCardsData = createAsyncThunk(
  "cardsReducer/fetchCardsData",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { trelloKey, trelloToken, selectedList } = state.authReducer

		try {
			const response = await fetch(`https://api.trello.com/1/lists/${selectedList?.id}/cards/?key=${trelloKey}&token=${trelloToken}`)
			const data = await response.json()

		  thunkAPI.dispatch(distributeCards(data))
      return data
		} catch (err) {
			if (err?.message?.includes("expired token")) {
			 thunkAPI.dispatch(deauthorize())
			}
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const completeLastCheckItem = createAsyncThunk(
	"cardsReducer/completeLastCheckItem",
	async (cardData: ITrelloCardData, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { trelloKey, trelloToken } = state.authReducer

		try {
			// getting checkItems, searching for first incomplete checkItem and getting it's id
			const checkItems = await (await fetch(
				`https://api.trello.com/1/checklists/${cardData.checklistId}/checkItems?key=${trelloKey}&token=${trelloToken}`
			)).json()
			checkItems.sort((a, b) => a.pos - b.pos)

			const targetCheckItemId = checkItems.find((i) => i.state === 'incomplete')?.id

			if (!targetCheckItemId) {
        return thunkAPI.rejectWithValue( new Error('All checkitems is completed or there is no checklist in this card.\n'))
      }

			// completing targetCheckItem (aka last incompleted checkitem in the checklist)
			const success = (await(await fetch(
				`https://api.trello.com/1/cards/${cardData.cardId}/checkItem/${targetCheckItemId}?state=complete&key=${trelloKey}&token=${trelloToken}`,
				{	method: "PUT" }
			)).json()).state === 'complete'
      
			if (success) {
				thunkAPI.dispatch(updateCard({
					cardDayId: cardData.cardDayId,
					cardId: cardData.cardId,
					checkItemsChecked: cardData.checkItemsChecked + 1
				}))
			} else return thunkAPI.rejectWithValue(new Error('Can\'t complete checkitem.'))

		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const createCard = createAsyncThunk<unknown, ICreateCardThunkProps>(
  "cardsReducer/createCard",
  async ({ newCard, Trello}, thunkAPI) => {
    try {
      const onCreationSuccess = async (createdCard) => {
        console.log('\nCard created successfully!')

        await createChecklist(createdCard.id, "Серии", newCard.length, newCard.watched)
				thunkAPI.dispatch(clearDistributedCards())
				thunkAPI.dispatch(fetchCardsData())
      }

      Trello.post('/cards/', newCard, onCreationSuccess)
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

export const removeCard = createAsyncThunk<unknown, IRemoveCardThunkProps>(
  "cardsReducer/removeCard",
	async ({cardToRemove, Trello}, thunkAPI) => {
   	try {
			Trello.delete(`/cards/${cardToRemove.cardId}`).then(() => {
				console.log('Card deleted successfully!')
				
				thunkAPI.dispatch(removeCardFromState({...cardToRemove}))
			}).catch((err) => {
				console.error('Can\'t delete card. Trello resonded with status code: ' + err.status)
				console.error('Response message: ', err.responseText)
				thunkAPI.rejectWithValue(err)
			})
			
		} catch (err) {
			return thunkAPI.rejectWithValue(err)
		}
	}
)

const cardsReducer = createSlice({
	name: "cardsReducer",
	initialState,
	reducers: {
		distributeCards(state: ICardsReducerState, action: PayloadAction<object[]>)  {

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
    clearDistributedCards(state: ICardsReducerState) {
      state.distributedData = [[],[],[],[],[],[],[]]
    },
		updateCard( // Currently used only inside "completeLastCheckitem" thunk, but can be extended if needed
      state: ICardsReducerState,
      action: PayloadAction<Pick<ITrelloCardData, "checkItemsChecked" | "cardId" | "cardDayId">>
    ) {
			const dayId = action.payload.cardDayId
			const card: ITrelloCardData = state.distributedData[dayId].find(card => card.cardId === action.payload.cardId)

			Object.entries(action.payload).forEach((a) => {
				card[a[0]] = a[1]
			})
		},
		removeCardFromState(
      state: ICardsReducerState,
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
