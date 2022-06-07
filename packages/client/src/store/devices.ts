import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DeviceInfo, DevicesInfoWithid } from '@assets/types'

const initialState: DevicesInfoWithid = []

export const devicesSlice = createSlice({
	name: 'devices',
	initialState,
	reducers: {
		setDevices: (state, action: PayloadAction<DevicesInfoWithid>) => {
			return (state = action.payload)
		},
	},
})

export const {} = devicesSlice.actions

export default devicesSlice.reducer
