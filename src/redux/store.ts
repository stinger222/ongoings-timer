import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerReducer from './reducers/headerReducer';
import cardsReducer from './reducers/cardsReducer';


const rootReducer = combineReducers({
	headerReducer,
	cardsReducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']