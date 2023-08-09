import { ITrelloCardData } from "../../../types/Trello";
import { createChecklist } from './../../../utils/reduxUtils'; // mocked
import { getTestCardData, TestDataVariant } from "../../../utils/testUtils";
import { Trello, mockDestributedData, mockRootState } from "../../../constants/constants";
import cardsSlice, {
  clearDistributedCards, completeLastCheckItem, createCard, distributeCards,
  fetchCardsData, removeCard, removeCardFromState, updateCard
} from "../cardsSlice"

jest.mock('../../../utils/reduxUtils')
globalThis.fetch = jest.fn()

describe("Testing async thunks", () => {
  describe("Testing 'fetchCardsData' thunk", () => {
    it('Should fetch cards data with resolved response', async () => {
      const mockTrelloResponse = {
        response: "from Trello"
      }
  
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTrelloResponse)
      })

      const dispatch = jest.fn()
      
      const thunk = fetchCardsData()
  
      await thunk(
        dispatch,
        () => mockRootState,
        () => ({})
      )
  
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)
      
      const [pending, distributeCards, resolved] = calls
  
      expect(pending[0].type).toBe('cards/fetchCardsData/pending')
      expect(distributeCards[0].type).toBe('cards/distributeCards')
      expect(distributeCards[0].payload).toEqual(mockTrelloResponse)
      expect(resolved[0].type).toBe('cards/fetchCardsData/fulfilled')
    })
  
    it('Should fetch cards data with rejected response', async () => {
      const errMessage = "Can't fetch cards data!";
  
      ;(fetch as jest.Mock).mockRejectedValue(new Error(errMessage))
  
      const dispatch = jest.fn()
      
      const thunk = fetchCardsData()
  
      await thunk(
        dispatch,
        () => mockRootState,
        () => ({})
      )
  
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)
      
      const [pending, rejected] = calls
  
      expect(pending[0].type).toBe('cards/fetchCardsData/pending')
      expect(rejected[0].type).toBe('cards/fetchCardsData/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe("Can't fetch cards data!")
    })
  
    it('Should fetch cards data with rejected response because of expired token', async () => {
      const errMessage = "If token expired, Trello returns message that contains 'expired token' substring that I trying to find when handling the error to deauthorize if that's the case"
  
      ;(fetch as jest.Mock).mockRejectedValue(new Error(errMessage))
  
      const dispatch = jest.fn()
      
      const thunk = fetchCardsData()
  
      await thunk(
        dispatch,
        () => mockRootState,
        () => ({})
      )
  
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)
      
      const [pending, deauthorize, rejected] = calls
  
      expect(pending[0].type).toBe('cards/fetchCardsData/pending')
      expect(deauthorize[0].type).toBe('auth/deauthorize')
      expect(rejected[0].type).toBe('cards/fetchCardsData/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe(errMessage)
    })
  })
  

  describe("Testing 'completeLastCheckItem' thunk", () => {
    it('Should mark last incompleted checkitem in the checklist as completed', async () => {
      const mockCardData: ITrelloCardData = getTestCardData(0, TestDataVariant.PROCESSED) as ITrelloCardData
      
      // repose from Trello with all checkitems in requested checklist
      const mockCheckItems = [
        {
          id: "some-id-that-checkitem-1-have",
          pos: 150,
          state: "incomplete"
        },
        {
          id: "some-id-that-checkitem-2-have",
          pos: 300,
          state: "incomplete"
        }
      ]

      // Two mock fetches
      ;(fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockCheckItems)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            id: "some-id-that-checkitem-1-have",
            pos: 150,
            state: "complete"
          })
        });

      const dispatch = jest.fn()
      const thunk = completeLastCheckItem(mockCardData)
  
      await thunk(
        dispatch,
        () => mockRootState,
        () => ({})
      )
      
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)
      
      const [pending, updateCard, fulfilled] = calls
  
      expect(pending[0].type).toBe('cards/completeLastCheckItem/pending')

      const {cardDayId, cardId, checkItemsChecked} = mockCardData
      expect(updateCard[0].type).toBe('cards/updateCard')
      expect(updateCard[0].payload).toEqual({
        cardDayId: cardDayId,
        cardId: cardId,
        checkItemsChecked: checkItemsChecked + 1
      })
      
      expect(fulfilled[0].type).toBe('cards/completeLastCheckItem/fulfilled')
    })

    it('Should throw an error because there is no checklist or checkitems in checklist', async () => {
      const mockCardData: ITrelloCardData = getTestCardData(0, TestDataVariant.PROCESSED) as ITrelloCardData
    
      // First mock fetch
      ;(fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve([])
        })
      
      const dispatch = jest.fn()
      const thunk = completeLastCheckItem(mockCardData)
  
      await thunk(
        dispatch,
        () => mockRootState,
        () => ({})
      )
      
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)
      
      const [pending, rejected] = calls
  
      expect(pending[0].type).toBe('cards/completeLastCheckItem/pending')
      expect(rejected[0].type).toBe('cards/completeLastCheckItem/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe('All checkitems is completed or there is no checklist in this card.\n')
    })
    
    it('Should throw an error because can\'t mark last incompleted checkitem as completed', async () => {
       const mockCardData: ITrelloCardData = getTestCardData(0, TestDataVariant.PROCESSED) as ITrelloCardData

      // repose from Trello with all checkitems in requested checklist
      const mockCheckItems = [
        {
          id: "some-id-that-checkitem-1-have",
          pos: 150,
          state: "incomplete"
        },
        {
          id: "some-id-that-checkitem-2-have",
          pos: 300,
          state: "incomplete"
        }
      ]

      // Two mock fetches
      ;(fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCheckItems)
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          id: "some-id-that-checkitem-1-have",
          pos: 150,
          state: "incomplete"
        })
      });
      
      const dispatch = jest.fn()
      const thunk = completeLastCheckItem(mockCardData)
  
      await thunk(
        dispatch,
        () => mockRootState,
        () => ({})
      )
      
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)
      
      const [pending, rejected] = calls
  
      expect(pending[0].type).toBe('cards/completeLastCheckItem/pending')
      expect(rejected[0].type).toBe('cards/completeLastCheckItem/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe('Can\'t complete checkitem.')
    })
  })


  describe("Testing 'createCard' thunk", () => {
    it("Should dispatch 'clearDistributedCards' & 'fetchCardsData' if new card create successfully", async () => {      
      const mockNewCardData = {
        name: "Some Card Name - Вт 13:30",
        desc: "https://player.url\nhttps://thumbnail.url",
        idList: "whatever",
        length: 12,
        watched: 4
      }

      const dispatch = jest.fn()

      const thunk = createCard(mockNewCardData)
          
      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )

      // post request to /cards/
      const cardCreationRequest = Trello.post.mock.calls[0] 

      expect(cardCreationRequest[0]).toBe('/cards/')
      expect(cardCreationRequest[1]).toEqual(mockNewCardData)

      ;(createChecklist as jest.Mock)
      
      await cardCreationRequest[2]({
        id: 'this-is-id-of-created-card'
      })

      const { calls: dispatchCalls } = dispatch.mock
      expect(dispatchCalls).toHaveLength(4)

      const [pending, fulfilled, clearDistributedCards, fetchCardsDataThunk] = dispatchCalls

      expect(pending[0].type).toBe('cards/createCard/pending')
      expect(fulfilled[0].type).toBe('cards/createCard/fulfilled')
      expect(clearDistributedCards[0].type).toBe('cards/clearDistributedCards')
      expect(fetchCardsDataThunk[0]).toBeInstanceOf(Function)
    })

    it("Should throw an error if card creation response is rejected", async () => {
      const mockNewCardData = {
        name: "Some Card Name - Вт 13:30",
        desc: "https://player.url\nhttps://thumbnail.url",
        idList: "whatever",
        length: 12,
        watched: 4
      }

      const dispatch = jest.fn()

      const thunk = createCard(mockNewCardData)

      ;(Trello.post as jest.Mock).mockImplementationOnce(() => {
        throw new Error("Trello response be like: \"Card creation failed for some reason, fu\"")
      })
      
      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )
      
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)

      const [pending, rejected] = calls
      expect(pending[0].type).toBe('cards/createCard/pending')
      expect(rejected[0].type).toBe('cards/createCard/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe("Trello response be like: \"Card creation failed for some reason, fu\"")
    })
  })


  describe("Testing 'removeCard' thunk", () => {
    it("Should dispatch 'removeCardFromState' if card deletion response is resolved", async () => {
      const dispatch = jest.fn()
      const cardToRemove = { cardDayId: 0, cardId: 'whatever-id' }
      const thunk = removeCard(cardToRemove)

      // delete request to /cards/${cardToRemove.cardId}
      ;(Trello.delete as jest.Mock).mockReturnValue(Promise.resolve()) 

      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)

      const [pending, removeCardFromState, fulfilled ] = calls

      expect(pending[0].type).toBe("cards/removeCard/pending")
      expect(removeCardFromState[0].type).toBe("cards/removeCardFromState")
      expect(removeCardFromState[0].payload).toEqual(cardToRemove)
      expect(fulfilled[0].type).toBe("cards/removeCard/fulfilled")
    })

    it("Should throw an error beacuse card deletion respose is rejected", async () => {
      const dispatch = jest.fn()
      const cardToRemove = { cardDayId: 0, cardId: 'whatever-id' }
      const thunk = removeCard(cardToRemove)

      // delete request to /cards/${cardToRemove.cardId}
      ;(Trello.delete as jest.Mock).mockReturnValue(Promise.reject({
        ok: false,
        status: 999,
        responseText: "Some error text that Trello responsed with beacuse it can't create card"
      })) 

      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )
      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)

      console.log(calls);
      
      const [pending, rejected ] = calls

      expect(pending[0].type).toBe("cards/removeCard/pending")
      expect(rejected[0].type).toBe("cards/removeCard/rejected")
      expect(rejected[0].payload).toEqual({
        ok: false,
        status: 999,
        responseText: "Some error text that Trello responsed with beacuse it can't create card"
      })
    })
  })
})


describe("Testing cardsReducer's reducers", () => { 
  describe("Testing 'distributeCards' reducer", () => {
    it('Should destribute array of valid cards', () => {
      const initialState = mockRootState.cardsReducer

      const cards = [
        getTestCardData(0, TestDataVariant.RAW),
        getTestCardData(0, TestDataVariant.RAW),
        getTestCardData(2, TestDataVariant.RAW),
        getTestCardData(6, TestDataVariant.RAW)
      ]

      const newState = cardsSlice(initialState, distributeCards(cards))

      // Sunday has 2 cards, and they're equal between each other
      expect(newState.distributedData[0]).toHaveLength(2)
      expect(newState.distributedData[0][0]).toEqual(getTestCardData(0, TestDataVariant.PROCESSED))
      expect(newState.distributedData[0][1]).toEqual(newState.distributedData[0][0])
      
      // Tuesday has 1 card 
      expect(newState.distributedData[2]).toHaveLength(1)
      expect(newState.distributedData[2][0]).toEqual(getTestCardData(2, TestDataVariant.PROCESSED))
      
      // And Saturday has 1 card as well
      expect(newState.distributedData[6]).toHaveLength(1)
      expect(newState.distributedData[6][0]).toEqual(getTestCardData(6, TestDataVariant.PROCESSED))
    })

    it('Should throw an error because there is no valid cards in the payload', () => {
      const initialState = mockRootState.cardsReducer

      const cards = [
        getTestCardData(0, TestDataVariant.INVALID_RAW),
        getTestCardData(6, TestDataVariant.INVALID_RAW),
      ]

      expect(() => {
        cardsSlice(initialState, distributeCards(cards))
      }).toThrowError("Cards in selected list doesn't match required pattern.")
    })
  })


  describe("Testing 'clearDistributedCards' reducer", () => {
    it("Should clear all destributed cards", () => {
      const initialState = {...mockRootState.cardsReducer, distributedData: [...mockDestributedData]}
      expect(initialState.distributedData).toStrictEqual(mockDestributedData)

      const newState = cardsSlice(initialState, clearDistributedCards())
      expect(newState.distributedData).toStrictEqual([[],[],[],[],[],[],[]])
    })
  })


  describe("Testing 'updateCard' reducer", () => {
    it("Should update card from the payload", () => {
      const mockProcessedCard = getTestCardData(0, TestDataVariant.PROCESSED)

      const initialState = {
        ...mockRootState.cardsReducer,
        distributedData: [[mockProcessedCard]] // Only Sunday have one single card
      }

      expect(initialState.distributedData[0][0]).toEqual(mockProcessedCard)
      
      // Increase "checkItemsChecked" by 4
      const newState = cardsSlice(initialState, updateCard({
        cardDayId: 0,
        cardId: initialState.distributedData[0][0].cardId,
        checkItemsChecked: initialState.distributedData[0][0].checkItemsChecked + 4
      }))

      expect(newState.distributedData[0][0]).toEqual({
        ...mockProcessedCard,
        cardDayId: 0,
        cardId: mockProcessedCard.cardId,
        checkItemsChecked: mockProcessedCard.checkItemsChecked + 4
      })
    })
  })


  describe("Testing 'removeCardFromState' reducer", () => {
    it("Should filted out card with passed id from destributed cards", () => {
      const mockProcessedCard = getTestCardData(0, TestDataVariant.PROCESSED)

      const initialState = {
        ...mockRootState.cardsReducer,
        distributedData: [[mockProcessedCard]] // Only Sunday have one single card
      }

      expect(initialState.distributedData[0][0]).toEqual(mockProcessedCard)
      expect(initialState.distributedData[0]).toHaveLength(1)

      // Remove card from state
      const newState = cardsSlice(initialState, removeCardFromState({
        cardId: mockProcessedCard.cardId,
        cardDayId: 0
      }))

      expect(newState.distributedData[0]).toHaveLength(0)
    })
  })
}) 


describe("Testing extra reducers", () => {
  describe("Testing 'fetchCardsData' extra reducer", () => {
    it('Should set pending state to true', async () => {
      // @ts-ignore
      const state = cardsSlice(mockRootState.cardsReducer, fetchCardsData.pending())
      expect(state.isPending).toBe(true)
      
    })

    it('Should set pending state to false because thunk is fulfilled', () => {
      // @ts-expect-error
      let state = cardsSlice(mockRootState.cardsReducer, fetchCardsData.pending())

      // @ts-expect-error
      state = cardsSlice(state, fetchCardsData.fulfilled())
      expect(state.isPending).toBe(false)
    })

    it('Should set pending state to false because thunk is rejected', () => {
       // @ts-expect-error
       let state = cardsSlice(mockRootState.cardsReducer, fetchCardsData.pending())
    
       // @ts-expect-error
       state = cardsSlice(state, fetchCardsData.rejected())
       expect(state.isPending).toBe(false) 
    })
  })
})
