import { Trello } from "../../../constants/constants";
import { fetchTrelloBoards } from "../authSlice"

describe("Testing authSlice async thunks", () => {
  describe("Testing 'fetchTrelloBoards' thunk", () => {
    it("Should dispatch 'setBoards' with fetched boards", async () => {
      const mockBoards = [
        {
          id: "some-id-for-board-#1",
          name: "Name of Board #1",
          whatever: "some field that will be omitted"
        }, {
          id: "some-id-for-board-#2",
          name: "Name of Board #2",
          whatever: "some field that will be omitted"
        }
      ]

      const dispatch = jest.fn()
      const thunk = fetchTrelloBoards()
      ;(Trello.get as jest.Mock).mockReturnValueOnce(Promise.resolve(mockBoards))

      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )

      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)

      const [pending, setBoards, fulfilled] = calls
      expect(pending[0].type).toBe('auth/fetchTrelloBoards/pending')
      expect(setBoards[0].type).toBe('auth/setBoards')
      expect(setBoards[0].payload)
        .toEqual(mockBoards.map(b => ({
          id: b.id,
          name: b.name
        })))
      expect(fulfilled[0].type).toBe('auth/fetchTrelloBoards/fulfilled')
    })

    it("Should throw an error if boards respnse is rejected", async () => {
      const dispatch = jest.fn()
      const thunk = fetchTrelloBoards()
      ;(Trello.get as jest.Mock).mockReturnValueOnce(Promise.reject({
        ok: false,
        status: 999,
        responseText: "Trello be like: Ooh, can't give you info about your boards, fu"
      }))

      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )

      // dispatch.mock.calls.forEach(i => console.log(i[0].type))

      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)

      const [pending, rejected] = calls
      expect(pending[0].type).toBe('auth/fetchTrelloBoards/pending')
      expect(rejected[0].type).toBe('auth/fetchTrelloBoards/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Object)
      expect(rejected[0].payload).toEqual({
        ok: false,
        status: 999,
        responseText: "Trello be like: Ooh, can't give you info about your boards, fu"
      })
    })
  })

  describe("Testing 'fetchSelectedBoardLists' thunk", () => {
    
  })
})

describe("Testing authSlice reducers", () => {
  it.todo('?')
})