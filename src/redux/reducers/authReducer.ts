import { createSlice } from "@reduxjs/toolkit";
import Trello from "../../models/Trello";

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
      state.trello_token =  Trello.token()
      state.trello_key = Trello.key()

      if (state.trello_key && state.trello_token) {
        state.isAuthorized = true
      }
    },
		deauthorize(state: IAuthState) {
      state.trello_key = null
      state.trello_token = null
      state.isAuthorized = false;

      Trello.deauthorize()
    },
    update(state: IAuthState) {
      state.isAuthorized = !state.isAuthorized
      state.isAuthorized = !state.isAuthorized
    }
	}
})

export const { authorize, deauthorize, update } = authReducer.actions

export default authReducer.reducer