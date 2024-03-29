import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { UIReducer, authReducer, cardsReducer } from './reducers';


const rootReducer = combineReducers({
	UIReducer,
	cardsReducer,
  authReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']