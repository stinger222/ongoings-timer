import { mockRootState } from "../../../constants/constants";
import { fetchCardsData } from "../cardsReducer"

global.fetch = jest.fn()
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
