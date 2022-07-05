import { createSlice } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthorized: boolean,
  trello_token: string | null,
  trello_key: string | null,
}

const initialState = {
  isAuthorized: false,
  trello_token: null,
  trello_key: null,
}

const authReducer = createSlice({
	name: "authReducer",
	initialState,
	reducers: {
		authorize(state: IAuthState) {
      state.trello_token =  (window as any).Trello.token()
      state.trello_key = (window as any).Trello.key()

      if (state.trello_key && state.trello_token) {
        state.isAuthorized = true
      }
    },
		deauthorize(state: IAuthState) {
      state.trello_key = null
      state.trello_token = null
      state.isAuthorized = false;

      (window as any).Trello.deauthorize()
    },
    update(state: IAuthState) {
      state.isAuthorized = !state.isAuthorized
      state.isAuthorized = !state.isAuthorized
    }
	}
})

export const { authorize, deauthorize, update } = authReducer.actions

export default authReducer.reducer