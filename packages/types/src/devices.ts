import { WithId } from './common'

enum DeviceType {
	desktop = '台式机',
	laptop = '笔记本',
	printer = '打印机',
	server = '服务器',
}

export interface DeviceInfo {
	user?: string
	department?:string
	mem?: object
	osInfo: object
	desc?: string
}

export type DeviceInfoWithId = DeviceInfo & WithId

export type DevicesInfoWithid = Array<DeviceInfoWithId>
