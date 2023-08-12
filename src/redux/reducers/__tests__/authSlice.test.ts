import { Trello } from "../../../constants/constants";
import { fetchSelectedBoardLists, fetchTrelloBoards } from "../authSlice"

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
    it("Should dispatch 'setSelectedBoardLists' with fetched lists for selected board", async () => {
      const dispatch = jest.fn()
      const thunk = fetchSelectedBoardLists("some-board-id")
      ;(Trello.get as jest.Mock).mockReturnValueOnce(Promise.resolve([
        {id: 'id-of-some-list-on-selected-board'},
        {id: 'id-of-abother-list-on-selected-board'}
      ]))

      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )

      // dispatch.mock.calls.forEach(i => console.log(i[0].type))

      const { calls } = dispatch.mock
      expect(calls).toHaveLength(3)

      const [pending, setSelectedBoardLists, fulfilled] = calls

      expect(pending[0].type).toBe('auth/fetchSelectedBoardLists/pending')
      expect(setSelectedBoardLists[0].type).toBe('auth/setSelectedBoardLists')
      expect(Trello.get.mock.calls).toHaveLength(1) // called just once
      expect(Trello.get.mock.calls[0]).toHaveLength(1) // with only one param: boardId
      expect(Trello.get.mock.calls[0][0]).toBe("/boards/some-board-id/lists") // and it's equal to..
      expect(fulfilled[0].type).toBe('auth/fetchSelectedBoardLists/fulfilled')
     
    })

    it("Should throw (rejectWithValue) an error if lists fetch is rejected", async () => {
      const dispatch = jest.fn()
      const thunk = fetchSelectedBoardLists("some-board-id")
      ;(Trello.get as jest.Mock).mockReturnValueOnce(Promise.reject({
        ok: false,
        status: 999,
        responseText: "Trello be like: Ooh, can't give you array of lists on this board, fu"
      }))

      await thunk(
        dispatch,
        () => ({}),
        () => ({})
      )

      const { calls } = dispatch.mock
      expect(calls).toHaveLength(2)

      const [pending, rejected] = calls
      expect(pending[0].type).toBe('auth/fetchSelectedBoardLists/pending')
      expect(rejected[0].type).toBe('auth/fetchSelectedBoardLists/rejected')
      expect(rejected[0].payload).toBeInstanceOf(Object)
      expect(rejected[0].payload).toEqual({
        ok: false,
        status: 999,
        responseText: "Trello be like: Ooh, can't give you array of lists on this board, fu"
      })
    })
  })
})

describe("Testing authSlice reducers", () => {
  it.todo('?')
})