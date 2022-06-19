import { falseRes, ErrorType, trueRes } from '@assets/error'
import { hasKeys } from '@assets/share'
import ping from 'ping'
import ip from 'ip'
import { IpScanner, PortScanner } from '@assets/types'
import { nodePortScanner } from '../common/node-port-scanner'

export const ipScanner = async (data: IpScanner) => {
	if (!hasKeys(data, 'ipStart')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	if (!ip.isV4Format(data.ipStart)) {
		return falseRes(ErrorType.IP_FORMAT_ERROR)
	}

	if (!data.ipEnd) {
		return trueRes([await ping.promise.probe(data.ipStart)])
	}

	if (!ip.isV4Format(data.ipEnd)) {
		return falseRes(ErrorType.IP_FORMAT_ERROR)
	}

	const res = await Promise.all(
		getCountForIpRange(data.ipStart, data.ipEnd).map((ipAddress) => ping.promise.probe(ipAddress))
	)

	return trueRes(res.filter((r) => r.alive && { host: r.host, alive: r.alive }))
}

const getCountForIpRange = (start: string, end: string) => {
	const count = ip.toLong(end) - ip.toLong(start)

	let ipRange: string[] = []
	for (let i = 0; i < count; i++) {
		ipRange.push(ip.fromLong(ip.toLong(start) + i))
	}

	return ipRange
}

export const portScanner = async (data: PortScanner) => {
	if (!hasKeys(data, 'ipAddrs', 'ports')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const {
		ipAddrs: { addrs = '', addrStart = '', addrEnd = '' },
		ports: { portEnd = 0, portStart = 0, ports = '' },
	} = data

	const portArr = ports
		? ports.split(',').map((port) => parseInt(port))
		: getPortsFromPortStartToPortEnd(portStart, portEnd)
	const hostArr = addrs ? addrs.split(',') : getPortsFromIpStartToIpEnd(addrStart, addrEnd)

	const result = await nodePortScanner(hostArr, portArr)

	console.log('result', result)

	return trueRes(result)
}

// 从开始地址与结束地址返回地址数组
const getPortsFromIpStartToIpEnd = (start: string, end: string) => {
	const ipStartBinary = ip.toLong(start)
	const ipEndBinary = ip.toLong(end)
	const ipLen = ipEndBinary - ipStartBinary

	return Array.from({ length: ipLen }, (_, i) => ip.fromLong(ipStartBinary + i))
}
// 获取开始端口到结束端口的端口数组
const getPortsFromPortStartToPortEnd = (start: number, end: number) => {
	const length = end - start

	return Array.from({ length }, (_, i) => start + i)
}
