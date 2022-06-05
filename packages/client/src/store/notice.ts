import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { NoticebarStatus } from '../comps/notice/Noticebar'

const initialState: NoticebarStatus = {
	status: 'success',
	message: '',
}

export const noticeSlice = createSlice({
	name: 'notice',
	initialState,
	reducers: {
		setNoticeMsg: (state, action: PayloadAction<NoticebarStatus>) => {
			return (state = action.payload)
		},
	},
})

export const { setNoticeMsg } = noticeSlice.actions

export default noticeSlice.reducer
