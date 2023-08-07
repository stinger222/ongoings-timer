import { mockRootState } from "../../../constants/constants";
import { ITrelloCardData } from "../../../types/Trello";
import cardsReducer, { completeLastCheckItem, createCard, fetchCardsData } from "../cardsReducer"

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

    it('Should throw an error because there is no checklist or checkitems in checklist', async () => {
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
        () => ({
          rejectWithValue() {}
        })
      )
      
      const { calls } = dispatch.mock
  
      expect(calls).toHaveLength(2)
      
      const [pending, rejected] = calls
  
      expect(pending[0].type).toBe('cardsReducer/completeLastCheckItem/pending')

      expect(rejected[0].type).toBe('cardsReducer/completeLastCheckItem/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe('All checkitems is completed or there is no checklist in this card.\n')
    })
    
    it('Should throw an error because can\'t mark last incompleted checkitem as completed', async () => {
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
        () => ({
          rejectWithValue() {}
        })
      )
      
      const { calls } = dispatch.mock
  
      expect(calls).toHaveLength(2)
      
      const [pending, rejected] = calls
  
      expect(pending[0].type).toBe('cardsReducer/completeLastCheckItem/pending')

      expect(rejected[0].type).toBe('cardsReducer/completeLastCheckItem/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Error)
      expect(rejected[0].payload.message).toBe('Can\'t complete checkitem.')
    })
  })


  describe("Testing 'createCard' thunk", () => {
    // it("Should dispatch 'clearDistributedCards' & 'fetchCardsData' if new card create successfully", async () => {
      
    // //   console.log(performance.now(), 1)
    // //   const wait = async () => new Promise(resolve => {
    // //     setTimeout(resolve, 3000)
    // //   })
    // //   await wait()
    // //   console.log(performance.now(), 2)
      
    // //   const mockNewCardData: INewCardData = {
    // //     name: "Some Card Name - Вт 13:30",
    // //     desc: "https://player.url\nhttps://thumbnail.url",
    // //     idList: "whatever",
    // //     length: 12,
    // //     watched: 4
    // //   }

    // //   const dispatch = jest.fn()
    // //   const trello: any = {}
    // //   trello.post = jest.fn(() =>
    // //   Promise.resolve({
    // //     id: 'new-card-id',
    // //     description: '...',
    // //   })
    // // );

    // //   const thunk = createCard({newCard: mockNewCardData, trello})
      
      
    // //   await thunk(
    // //     dispatch,
    // //     () => ({}),
    // //     () => ({
    // //       rejectWithValue() {}
    // //     })
    // //     )


    // //   const { calls: trelloCalls } = trello.post.mock
    // //   const [ cardCreationCall ] = trelloCalls

    // //   cardCreationCall[2]({
    // //     description: `This object will be passed to 'onCreationSuccess' function
    // //     and actually should contain data about card that was just created, including 'id' field`,
    // //     id: 'new-card-id'
    // //   })
      
    // //   const { calls: dispatchCalls } = dispatch.mock
      
      
    // //   const [ pending, fulfilled ] = dispatchCalls
      
    // })

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
    it('Should set pending state to true', async () => {
      // @ts-ignore
      const state = cardsReducer(mockRootState.cardsReducer, fetchCardsData.pending())
      expect(state.isPending).toBe(true)
      
    })

    it('Should set pending state to false because thunk is fulfilled', () => {
      // @ts-expect-error
      let state = cardsReducer(mockRootState.cardsReducer, fetchCardsData.pending())

      // @ts-expect-error
      state = cardsReducer(state, fetchCardsData.fulfilled())
      expect(state.isPending).toBe(false)
    })

    it('Should set pending state to false because thunk is rejected', () => {
       // @ts-expect-error
       let state = cardsReducer(mockRootState.cardsReducer, fetchCardsData.pending())
    
       // @ts-expect-error
       state = cardsReducer(state, fetchCardsData.rejected())
       expect(state.isPending).toBe(false) 
    })
  })
})