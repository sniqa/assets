import { falseRes, ErrorType, trueRes } from '@assets/error'
import { hasKeys } from '@assets/share'
import ping from 'ping'
import ip from 'ip'
import { IpScanner } from '@assets/types'

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
