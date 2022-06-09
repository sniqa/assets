import WebSocket, { WebSocketServer } from 'ws'

interface WsServerConfig {
	port: number
}

export const wsServer = ({ port }: WsServerConfig) => {
	const wss = new WebSocketServer({
		port,
	})

	wss.on('connection', (ws) => {
		ws.on('message', (data) => {
			const target = JSON.parse(data.toString())

			console.log(target)

			ws.send(JSON.stringify(target))
		})
	})
}
