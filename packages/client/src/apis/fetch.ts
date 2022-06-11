import { falseRes, ErrorType } from '@assets/error'
import { notice } from './mitt'

import { httpConfig } from './serverConfig'


const url = `http://${httpConfig.hostname}:${httpConfig.port}${httpConfig.path}`

// fetch second argument
const init = (data: Record<string, any>): RequestInit => ({
	method: 'POST',
	body: JSON.stringify(data),
	headers: new Headers({
		'Content-type': 'application/json',
	}),
})

const onNetworkErrorCallback = () => {
	notice({ status: 'error', message: '网络故障或服务器无响应' })
	return falseRes(ErrorType.NETWORK_OR_SERVER_ERROR)
}

export const _fetch = async (data: Record<string, any>) =>
	await fetch(url, init(data))
		.then((res) => (res.ok ? res.json() : onNetworkErrorCallback()))
		.catch((res) => onNetworkErrorCallback())
