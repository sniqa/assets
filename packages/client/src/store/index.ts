import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import noticeReducer from './notice'
import userReducer from './user'

// import documentReducer from './document'

const store = configureStore({
	reducer: {
		// document: documentReducer,
		users: userReducer,
		notice: noticeReducer,
	},
	middleware: [],
})

export type RootState = ReturnType<typeof store.getState>

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
