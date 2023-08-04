import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerReducer from './reducers/headerReducer';
import cardsReducer from './reducers/cardsReducer';
import authReducer from './reducers/authReducer';


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