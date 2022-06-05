import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfo, UserInfoWitId } from '@assets/types'
import { RootState } from './index'

const initialState: Array<UserInfoWitId> = []

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUsers: (state) => {
			return state
		},
		setUsers: (state, action: PayloadAction<Array<UserInfo>>) => {
			return (state = action.payload)
		},
		addUser: (state, action: PayloadAction<UserInfo>) => {
			return [action.payload, ...state]
		},
		modifyUser: (state, action: PayloadAction<UserInfo>) => {
			return state.map((user) => (user === action.payload ? { ...user, ...action.payload } : user))
		},
		findUsers: (state, action: PayloadAction<UserInfo>) => {
			return state.filter((user) => user === action.payload)
		},
		deleteManyUser: (state, action: PayloadAction<Array<UserInfoWitId>>) => {
			return state.filter((user) => !action.payload.some((targetUser) => targetUser._id === user._id))
		},
	},
})

export const { getUsers, setUsers, addUser, findUsers, modifyUser, deleteManyUser } = UserSlice.actions

export default UserSlice.reducer
