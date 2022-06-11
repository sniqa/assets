import { WithId } from './common'

interface IpInfo {
	ipStart?: string
	ipEnd?: string
	netmask?: string
	gateway?: string
	dns?: string[]
}

export interface NetType{
	typeName?: string
	desc?: string
}

export type NetTypeInfo = NetType & IpInfo

export type NetTypeInfoWithId = NetTypeInfo & WithId
