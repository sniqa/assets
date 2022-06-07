import { WithId } from './common'

enum DeviceType {
	desktop = '台式机',
	laptop = '笔记本',
	printer = '打印机',
	server = '服务器',
}

export interface DeviceInfo {
	deviceName?: string
	user?: string
	deviceType?: DeviceType
	location?: string
	ipType?: string
	useIp?: string
	desc?: string
}

export type DeviceInfoWithId = DeviceInfo & WithId

export type DevicesInfoWithid = Array<DeviceInfoWithId>
