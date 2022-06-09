import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfo, UserInfoWitId } from '@assets/types'
import { RootState } from './index'

const initialState: Array<UserInfoWitId> = []

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<Array<UserInfo>>) => {
			return (state = action.payload)
		},
		addUser: (state, action: PayloadAction<UserInfo>) => {
			return [action.payload, ...state]
		},
		updateUser: (state, action: PayloadAction<UserInfoWitId>) => {
			return state.map((user) => (user._id === action.payload._id ? { ...user, ...action.payload } : user))
		},
		findUsers: (state, action: PayloadAction<UserInfo>) => {
			return state.filter((user) => user === action.payload)
		},
		deleteManyUser: (state, action: PayloadAction<Array<UserInfoWitId>>) => {
			return state.filter((user) => !action.payload.some((targetUser) => targetUser._id === user._id))
		},
	},
})

export const { setUsers, addUser, findUsers, updateUser, deleteManyUser } = UserSlice.actions

export default UserSlice.reducer
