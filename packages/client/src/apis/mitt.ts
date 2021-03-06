import mitt, { Emitter } from 'mitt'
import { NoticebarStatus } from '../comps/notice/Noticebar'

type MittEvents = {
	notice: NoticebarStatus
}

export const emitter: Emitter<MittEvents> = mitt<MittEvents>()

export const notice = (state: NoticebarStatus) => {
	emitter.emit('notice', state)
}
