import { WithId } from './common'

interface IpInfo {
	ipStart?: string
	ipEnd?: string
	netmask?: string
	gateway?: string
	dns?: string[]
}

export interface IpTypeInfo {
	typeName?: string
	desc?: string
}

export type IpTypeInfoWithId = IpTypeInfo & IpInfo & WithId
