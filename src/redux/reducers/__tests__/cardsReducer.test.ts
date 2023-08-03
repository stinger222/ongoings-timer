import { mockRootState } from "../../../constants/constants";
import { ITrelloCardData } from "../../../types/Trello";
import { Week } from "../../../utils/dateTimeUtils";
import { completeLastCheckItem, fetchCardsData } from "../cardsReducer"

global.fetch = jest.fn()

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
  
      await thunk(dispatch, () => mockRootState, () => ({
        rejectWithValue() {}
      }))
  
      const { calls } = dispatch.mock
  
      expect(calls).toHaveLength(3)
      
      const [pending, distributeCards, resolved] = calls
  
      expect(pending[0].type).toBe('cardsReducer/fetchCardsData/pending')
      expect(distributeCards[0].type).toBe('cardsReducer/distributeCards')
      expect(distributeCards[0].payload).toBe(mockTrelloResponse)
      expect(resolved[0].type).toBe('cardsReducer/fetchCardsData/fulfilled')
    })
  
    it('Should fetch cards data with rejected response', async () => {
      const errMessage = "Can't fetch cards data!";
  
      ;(fetch as jest.Mock).mockRejectedValue(new Error(errMessage))
  
      const dispatch = jest.fn()
      
      const thunk = fetchCardsData()
  
      await thunk(dispatch, () => mockRootState, () => ({
        rejectWithValue() {}
      }))
  
      const { calls } = dispatch.mock
  
      expect(calls).toHaveLength(2)
      
      const [pending, rejected] = calls
  
      expect(pending[0].type).toBe('cardsReducer/fetchCardsData/pending')
      expect(rejected[0].type).toBe('cardsReducer/fetchCardsData/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe("Can't fetch cards data!")
    })
  
    it('Should fetch cards data with rejected response because of expired token', async () => {
      const errMessage = "If token expired, Trello returns message that contains 'expired token' substring that I trying to find when handling the error to deauthorize if that's the case"
  
      ;(fetch as jest.Mock).mockRejectedValue(new Error(errMessage))
  
      const dispatch = jest.fn()
      
      const thunk = fetchCardsData()
  
      await thunk(dispatch, () => mockRootState, () => ({
        rejectWithValue() {}
      }))
  
      const { calls } = dispatch.mock
  
      expect(calls).toHaveLength(3)
      
      const [pending, deauthorize, rejected] = calls
  
      expect(pending[0].type).toBe('cardsReducer/fetchCardsData/pending')
  
      expect(deauthorize[0].type).toBe('authReducer/deauthorize')
  
      expect(rejected[0].type).toBe('cardsReducer/fetchCardsData/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe(errMessage)
    })
  })
  
  describe("Testing 'completeLastCheckItem' thunk", () => {
    it('Should mark last incompleted checkitem in the checklist as completed', async () => {
      // cardData that passed in the thunk
      const mockCardData: ITrelloCardData = {
        checkItems: 2,
        checkItemsChecked: 0,
        checklistId: "some-checklist-id",
        cardTitle: "Some Card Title",
        cardDayId: new Date().getDay(),
        cardDesc: "https://player.url\nhttps://thumbnail.url",
        cardUrl: "https://trello-card.url/?id=some-card-id",
        cardId: "some-card-id"
      }
      
      // repose from Trello with all checkitems in requested checklist
      let mockCheckItems = [
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
        () => ({
          rejectWithValue() {}
        })
      )
      
      const { calls } = dispatch.mock
  
      expect(calls).toHaveLength(3)
      
      const [pending, updateCard, fulfilled] = calls
  
      expect(pending[0].type).toBe('cardsReducer/completeLastCheckItem/pending')

      const {cardDayId, cardId, checkItemsChecked} = mockCardData
      expect(updateCard[0].type).toBe('cardsReducer/updateCard')
      expect(updateCard[0].payload).toEqual({
        cardDayId: cardDayId,
        cardId: cardId,
        checkItemsChecked: checkItemsChecked + 1
      })
      
      expect(fulfilled[0].type).toBe('cardsReducer/completeLastCheckItem/fulfilled')
    })
    it.todo('Should throw an error because there is no checklist or checkitems in checklist')  // async
    it.todo('Should throw an error because can\'t mark last incompleted checkitem as completed')  // async
  })

  describe("Testing 'createCard' thunk", () => {
    it.todo("Should dispatch 'clearDistributedCards' & 'fetchCardsData' if new card create successfully")  // async
    it.todo("Should throw an error if card creation response is rejected")  // async
  })

  describe("Testing 'removeCard' thunk", () => {
    it.todo("Should dispatch 'removeCardFromState' if card deletion respose is resolved")  // async
    it.todo("Should throw an error beacuse card deletion respose is rejected")  // async
  })
})


// yeaa, I probably should've call them slices as docs suggested... :D
describe("Testing cardsReducer's reducers", () => { 
  describe("Testing 'distributeCards' reducer", () => {
    it.todo('Should destribute array of valid cards')
    it.todo('Should throw an error because there is no valid cards in the payload')
  })
  describe("Testing 'clearDistributedCards' reducer", () => {
    it.todo("Should clear all destributed cards")
  })
  describe("Testing 'updateCard' reducer", () => {
    it.todo("Should update card from the payload")
  })
  describe("Testing 'removeCardFromState' reducer", () => {
    it.todo("Should filted out card with passed id from destributed cards")
  })
}) 

describe("Testing extra reducers", () => {
  describe("Testing 'fetchCardsData' extra reducer", () => {
    it.todo('Should set pending state to true')
    it.todo('Should set pending state to false because thunk is fulfilled')
    it.todo('Should set pending state to false because thunk is rejected')
  })
})