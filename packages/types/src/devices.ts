import { WithId } from './common'

enum DeviceType {
	terminal = '终端',
	subterminal = '亚终端',
	server = '服务器',
}

interface DevicesInfo {
	deviceName?: string
	user?: string
	deviceType?: DeviceType
	location?: string
	ipType?: string
	useIp?: string
	desc?: string
}
