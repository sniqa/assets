import net from 'net'

interface SocketStatus {
	status: string
	host: string
	port: number
}
interface PostStatus {
	port: number
	status: string
}

interface ScanPortResults {
	host: string
	open: PostStatus[]
	close: PostStatus[]
}

const MAX_SOCKET_LENGTH = 32

const connectToPort = (host: string, port: number): Promise<SocketStatus> => {
	return new Promise((resolve, reject) => {
		if (!Number.isInteger(port)) reject({ error: 'port must be an integer' })
		if (port < 1 || port > 65535) reject({ error: 'port must be in range [1-65535]' })

		const socket: net.Socket = new net.Socket()

		const timeout = 200

		const socketStatus: SocketStatus = {
			status: 'initialized',
			host,
			port,
		}

		socket.on('connect', function () {
			socketStatus.status = 'connect'
			socket.destroy()
			resolve(socketStatus)
		})
		socket.on('timeout', function () {
			socketStatus.status = 'timeout'
			socket.destroy()
			resolve(socketStatus)
		})
		socket.on('error', function (exception) {
			socketStatus.status = 'error'
			socket.destroy()
			resolve(socketStatus)
		})
		socket.on('close', function (exception) {
			socketStatus.status = 'close'
			socket.destroy()
			resolve(socketStatus)
		})

		socket.setTimeout(timeout)

		socket.connect(port, host)
	})
}

const connectToPorts = async (host: string, ports: number[]) => {
	const scanResults: ScanPortResults = {
		host,
		open: [],
		close: [],
	}

	const len = (ports.length % MAX_SOCKET_LENGTH) + 1

	for (let i = 0; i < len; i++) {
		const start = i * MAX_SOCKET_LENGTH

		const curPorts = ports.slice(start, start + MAX_SOCKET_LENGTH)

		await Promise.all(
			curPorts.map(async (port) => {
				const result = await connectToPort(host, port)

				result.status === 'connect'
					? scanResults.open.push({ port: result.port, status: result.status })
					: scanResults.close.push({ port: result.port, status: result.status })
			})
		)
	}

	console.log('scanResults', scanResults)

	return scanResults
}

export const nodePortScanner = async (hosts: string[], ports: number[]) => {
	let result: ScanPortResults[] = []

	const len = hosts.length

	for (let i = 0; i < len; i++) {
		result.push(await connectToPorts(hosts[i], ports))
	}

	return result
}

// scan range of ports for status (open|closed)
// export const nodePortScanner = (host: string, ports: number[]) => {
// 	return new Promise((resolve, reject) => {
// 		// all ports that exist
// 		const allPorts = Array.from({ length: 65535 }, (_, i) => i + 1)

// 		// connect to a single port and get the status
// 		const connectToPort = (host: string, port: number, callback: any) => {
// 			// error checking args
// 			if (!Number.isInteger(port)) reject({ error: 'port must be an integer' })
// 			if (port < 1 || port > 65535) reject({ error: 'port must be in range [1-65535]' })

// 			const socket = new net.Socket()
// 			// increase this if y'all on dial up
// 			let timeout = 200

// 			// new properties & events for port scanner
// 			const sock = {
// 				status: 'initialized',
// 				host,
// 				port,
// 				_events: { complete: callback },
// 			}

// 			// events for socket
// 			socket.on('connect', function () {
// 				sock.status = 'connect'
// 				socket.destroy()
// 			})
// 			socket.on('timeout', function () {
// 				sock.status = 'timeout'
// 				socket.destroy()
// 			})
// 			socket.on('error', function (exception) {
// 				sock.status = 'error'
// 				socket.destroy()
// 			})
// 			socket.on('close', function (exception) {
// 				sock._events.complete(sock)
// 			})

// 			socket.setTimeout(timeout)
// 			socket.connect(port, host)
// 		}

// 		// recursive function to check all port status one after the other is complete
// 		const connectToPorts = (host: string, ports: number[], scanResults: any) => {
// 			// let port = ports.shift()

// 			return ports.map((port) =>
// 				connectToPort(host, port, (result: any) => {
// 					if (result.status == 'connect') {
// 						scanResults.ports.open.push(result.port)
// 					} else {
// 						scanResults.ports.closed.push(result.port)
// 					}

// 					// recursivly go through all the ports
// 					if (ports.length) {
// 						connectToPorts(host, ports, scanResults)
// 					}
// 					// when ports are done resolve the promise
// 					else {
// 						resolve(scanResults)
// 					}
// 				})
// 			)

// 			// connectToPort(host, port, function (result: any) {
// 			// 	// add to our results based on the status of the result and scan
// 			// 	if (result.status == 'connect') {
// 			// 		scanResults.ports.open.push(result.port)
// 			// 	} else {
// 			// 		scanResults.ports.closed.push(result.port)
// 			// 	}

// 			// 	// recursivly go through all the ports
// 			// 	if (ports.length) {
// 			// 		connectToPorts(host, ports, scanResults)
// 			// 	}
// 			// 	// when ports are done resolve the promise
// 			// 	else {
// 			// 		resolve(scanResults)
// 			// 	}
// 			// })
// 		}

// 		// error checking args
// 		if (host == undefined || !host) reject({ error: 'host is required' })
// 		if (ports == undefined || !ports) reject({ error: 'ports is required' })
// 		if (!Array.isArray(ports)) reject({ error: 'ports must be an array' })

// 		// scan results will be host and arrays for open and closed ports
// 		let scanResults = { host: host, ports: { open: [], closed: [] } }

// 		// no ports = all ports
// 		if (!ports.length) ports = allPorts

// 		connectToPorts(host, ports, scanResults)
// 	})
// }
