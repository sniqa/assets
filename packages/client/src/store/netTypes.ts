import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NetTypeInfoWithId, NetTypeInfo } from '@assets/types'

const initialState: Array<NetTypeInfoWithId> = []

const netTypeSlice = createSlice({
	name: 'netType',
	initialState,
	reducers: {
		addNetType: (state, action: PayloadAction<NetTypeInfoWithId>) => {
			return [...state, action.payload]
		},
		setNetTypes: (state, action: PayloadAction<Array<NetTypeInfo>>) => {
			return (state = action.payload)
		},
		updateNetType: (state, action: PayloadAction<NetTypeInfoWithId>) => {
			return state.map((netType) => (netType._id === action.payload._id ? { ...netType, ...action.payload } : netType))
		},
		findNetTypes: (state, action: PayloadAction<NetTypeInfo>) => {
			return state.filter((netType) => netType === action.payload)
		},
		deleteManyNetType: (state, action: PayloadAction<Array<NetTypeInfoWithId>>) => {
			return state.filter((netType) => !action.payload.some((targetUser) => targetUser._id === netType._id))
		},
	},
})

export const { addNetType, setNetTypes, updateNetType, findNetTypes, deleteManyNetType } = netTypeSlice.actions

export default netTypeSlice.reducer
