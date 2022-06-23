import { notice } from './mitt'
import { nanoid } from 'nanoid'
import mitt from 'mitt'

export const wsmitter = mitt()

const serverInfo = {
	hostname: 'localhost',
	port: 19801,
	router: '/ws',
}

const url = `ws://${serverInfo.hostname}:${serverInfo.port}/${serverInfo.router}`

const ws = new WebSocket(url)

interface MapType {
	data: any
}

const map = new Map<string, MapType>()

switch (ws.readyState) {
	case WebSocket.CLOSED:
		notice({
			status: 'error',
			message: '连接已断开',
		})
}

ws.onopen = () => console.log(`connect ws server success`)

ws.onclose = () => console.log(`ws connection was closed`)

ws.onerror = () => console.log(`ws connection was error`)

ws.onmessage = (e) => {
	const data = JSON.parse(e.data)

	Object.keys(data).map((flag) => wsmitter.emit(flag, data[flag]))
}

// export const send = (data: Record<string, any>) => {
// 	const id = nanoid()

// 	ws.send(JSON.stringify({ id, data }))

// 	return new Promise((resolve) => {
// 		ws.onmessage = (e) => {
// 			const { id: resId, data } = JSON.parse(e.data)

// 			resId === id && resolve(data)
// 		}
// 	})
// }

export const send = (data: Record<string, any>) => {
	ws.send(JSON.stringify(data))
}

export {}
