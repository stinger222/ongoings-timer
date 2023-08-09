import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerReducer from './reducers/headerSlice';
import cardsReducer from './reducers/cardsSlice';
import authReducer from './reducers/authSlice';


const rootReducer = combineReducers({
	headerReducer,
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