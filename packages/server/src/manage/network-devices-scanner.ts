import { NetworkDevicesScannerAPI } from '@juliendu11/network-devices-scanner-api'

export const deviceScan = async () => {
	const instance = new NetworkDevicesScannerAPI()

	const connections = instance.findConnections()

	console.log('connections', connections[0])

	const getDevice = async (device: any) => {
		return await instance.findDevices(device)
	}

	for (let i = 0; i < connections.length; i++) {
		const res = await getDevice(connections[i])

		console.log('deviece', res)
	}
}
