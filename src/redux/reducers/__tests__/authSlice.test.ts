import { Trello, mockRootState } from "../../../constants/constants";
import authSlice, { authorize, deauthorize, fetchSelectedBoardLists, fetchTrelloBoards, selectBoard, selectList, setBoards, setSelectedBoardLists } from "../authSlice"

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
  describe("Testing 'authorize' reducer", () => {
    it('Should define trello key, token and make isAuthorized field true', () => {
      const initialState = mockRootState.authReducer // TODO: why sould I test mockRootState here?
      expect(initialState.trelloKey).toBe(null)
      expect(initialState.trelloToken).toBe(null)
      expect(initialState.isAuthorized).toBe(false)
      
      ;(Trello.token as jest.Mock).mockReturnValue("this-is-mock-trello-token")
      ;(Trello.key as jest.Mock).mockReturnValue("this-is-mock-trello-api-key")

      const newState = authSlice(initialState, authorize())
      
      expect(newState.trelloToken).toBe("this-is-mock-trello-token")
      expect(newState.trelloKey).toBe("this-is-mock-trello-api-key")
      expect(newState.isAuthorized).toBe(true)
    })

    it("Should keep isAuthorized field to false if there is no trello token", () => {
      const initialState = mockRootState.authReducer // TODO: why sould I test mockRootState here?
      
      ;(Trello.token as jest.Mock).mockReturnValue(undefined)
      ;(Trello.key as jest.Mock).mockReturnValue("this-is-mock-trello-api-key")

      const newState = authSlice(initialState, authorize())
      
      expect(newState.trelloToken).toBe(undefined)
      expect(newState.trelloKey).toBe("this-is-mock-trello-api-key")
      expect(newState.isAuthorized).toBe(false)
    })

    it("Should keep isAuthorized field to false if there is no trello api key", () => {
      const initialState = mockRootState.authReducer // TODO: why sould I test mockRootState here?
      
      ;(Trello.token as jest.Mock).mockReturnValue("this-is-mock-trello-token")
      ;(Trello.key as jest.Mock).mockReturnValue(undefined)

      const newState = authSlice(initialState, authorize())
      
      expect(newState.trelloToken).toBe("this-is-mock-trello-token")
      expect(newState.trelloKey).toBe(undefined)
      expect(newState.isAuthorized).toBe(false)
    })
  })


  describe("Testing 'deauthorize' reducer", () => {
    it("Should set all auth-related fileds in the state to default value and call Trello.deauthorize", () => {
      const initialState = {
        ...mockRootState.authReducer,
        isAuthorized: true,
        trelloToken: "some-trello-token",
        trelloKey: "some-trello-api-key",
        trelloBoards:  [{
          id: "some-board-1",
          name: "Board 1"
        }, {
          id: "some-board-2",
          name: "Board 2"
        }],
        selectedBoard: {id: "some-board-2", name: 'Board 2'},
        selectedBoardLists: [{
          id: "some-list-1",
          name: "List 1"
        }, {
          id: "some-list-2",
          name: "List 2"
        }],
        selectedList: {id: "some-list-2", name: "List 2"},
      }

      expect(Trello.deauthorize.mock.calls).toHaveLength(0)
      
      const newState = authSlice(initialState, deauthorize())

      expect(newState.isAuthorized).toBe(false)
			expect(newState.trelloToken).toBe(null)
			expect(newState.trelloKey).toBe(null)
			expect(newState.trelloBoards).toBe(null)
			expect(newState.selectedBoard).toBe(null)
			expect(newState.selectedBoardLists).toBe(null)
			expect(newState.selectedList).toBe(null)

      expect(Trello.deauthorize.mock.calls).toHaveLength(1)
    })
  })


  describe("Testing 'setBoards' reducer", () => {
    it("Should set 'trelloBoards' field value to passed array of boards", () => {
      const initialState = mockRootState.authReducer
      expect(initialState.trelloBoards).toBe(null)

      const newState = authSlice(initialState, setBoards([{
        id: "some-board-id",
        name: "Board Name"
      }]))
      
      expect(newState.trelloBoards).toEqual([{
        id: "some-board-id",
        name: "Board Name"
      }])
    })

    it("Should set 'trelloBoards' field to empty array if passed boards array is empty", () => {
      const initialState = mockRootState.authReducer

      const newState = authSlice(initialState, setBoards([]))
      
      expect(newState.trelloBoards).toBeInstanceOf(Array)
      expect(newState.trelloBoards).toHaveLength(0)
    })

    it("Should keep 'trelloBoards' field null if passed boards array is undefined", () => {
      const initialState = mockRootState.authReducer

      const newState = authSlice(initialState, setBoards())
      
      expect(newState.trelloBoards).toBe(null)
    })
  })


  describe("Testing 'setSelectedBoardLists' reducer", () => {
    it("Should set 'selectedBoardLists' field value to passed array of lists", () => {
      const initialState = mockRootState.authReducer
      expect(initialState.selectedBoardLists).toBe(null)

      const newState = authSlice(initialState, setSelectedBoardLists([{
        id: "some-list-id",
        name: "List Name"
      }]))
      
      expect(newState.selectedBoardLists).toEqual([{
        id: "some-list-id",
        name: "List Name"
      }])
    })

    it("Should set 'selectedBoardLists' field to empty array if passed lists array is empty", () => {
      const initialState = mockRootState.authReducer

      const newState = authSlice(initialState, setSelectedBoardLists([]))
      
      expect(newState.selectedBoardLists).toBeInstanceOf(Array)
      expect(newState.selectedBoardLists).toHaveLength(0)
    })

    it("Should keep 'selectedBoardLists' field null if passed lists array is undefined", () => {
      const initialState = mockRootState.authReducer

      const newState = authSlice(initialState, setSelectedBoardLists())
      
      expect(newState.selectedBoardLists).toBe(null)
    })
  })


  describe("Testing 'selectBoard' reducer", () => {
    it("Should set 'selectedBoard' field value to passed board object", () => {
      const initialState = mockRootState.authReducer
      expect(initialState.selectedBoard).toBe(null)

      const newState = authSlice(initialState, selectBoard({
        id: "some-board-id",
        name: "Board Name"
      }))
      
      expect(newState.selectedBoard).toEqual({
        id: "some-board-id",
        name: "Board Name"
      })
    })

    it("Should keep 'selectedBoard' field null if passed board object is undefined", () => {
      const initialState = mockRootState.authReducer

      const newState = authSlice(initialState, selectBoard())
      
      expect(newState.selectedBoard).toBe(null)
    })
  })


  describe("Testing 'selectList' reducer", () => {
    it("Should set 'selectedList' field value to passed list object", () => {
      const initialState = mockRootState.authReducer
      expect(initialState.selectedList).toBe(null)

      const newState = authSlice(initialState, selectList({
        id: "some-list-id",
        name: "List Name"
      }))
      
      expect(newState.selectedList).toEqual({
        id: "some-list-id",
        name: "List Name"
      })
    })

    it("Should keep 'selectedList' field null if passed list object is undefined", () => {
      const initialState = mockRootState.authReducer

      const newState = authSlice(initialState, selectList())
      
      expect(newState.selectedList).toBe(null)
    })
  })
})