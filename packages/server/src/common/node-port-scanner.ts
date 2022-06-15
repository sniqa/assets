import net from 'net'

// scan range of ports for status (open|closed)
export const nodePortScanner = (host: string, ports: number[]) => {
	return new Promise((resolve, reject) => {
		// all ports that exist
		const allPorts = Array.from({ length: 65535 }, (_, i) => i + 1)

		// connect to a single port and get the status
		const connectToPort = (host: string, port: number, callback: any) => {
			// error checking args
			if (!Number.isInteger(port)) reject({ error: 'port must be an integer' })
			if (port < 1 || port > 65535) reject({ error: 'port must be in range [1-65535]' })

			const socket = new net.Socket()
			// increase this if y'all on dial up
			let timeout = 200

			// new properties & events for port scanner
			const sock = {
				status: 'initialized',
				host,
				port,
				_events: { complete: callback },
			}

			// events for socket
			socket.on('connect', function () {
				sock.status = 'connect'
				socket.destroy()
			})
			socket.on('timeout', function () {
				sock.status = 'timeout'
				socket.destroy()
			})
			socket.on('error', function (exception) {
				sock.status = 'error'
				socket.destroy()
			})
			socket.on('close', function (exception) {
				sock._events.complete(sock)
			})

			socket.setTimeout(timeout)
			socket.connect(port, host)
		}

		// recursive function to check all port status one after the other is complete
		const connectToPorts = (host: string, ports: any, scanResults: any) => {
			let port = ports.shift()

			connectToPort(host, port, function (result: any) {
				// add to our results based on the status of the result and scan
				if (result.status == 'connect') {
					scanResults.ports.open.push(result.port)
				} else {
					scanResults.ports.closed.push(result.port)
				}

				// recursivly go through all the ports
				if (ports.length) {
					connectToPorts(host, ports, scanResults)
				}
				// when ports are done resolve the promise
				else {
					resolve(scanResults)
				}
			})
		}

		// error checking args
		if (host == undefined || !host) reject({ error: 'host is required' })
		if (ports == undefined || !ports) reject({ error: 'ports is required' })
		if (!Array.isArray(ports)) reject({ error: 'ports must be an array' })

		// scan results will be host and arrays for open and closed ports
		let scanResults = { host: host, ports: { open: [], closed: [] } }

		// no ports = all ports
		if (!ports.length) ports = allPorts

		connectToPorts(host, ports, scanResults)
	})
}
