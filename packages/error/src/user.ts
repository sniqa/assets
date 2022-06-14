import { ErrotTip, TrueRes, ErrorRes } from '@assets/types'

export const falseRes = (errorTip: ErrotTip) => {
	return {
		success: false,
		...errorTip,
	}
}

export const trueRes = <T>(data: T): TrueRes<T> => {
	return {
		success: true,
		data,
	}
}

export const ErrorType = {
	MISSING_PARAMS: {
		errCode: 1101,
		errMsg: 'MISSING_PARAMS',
	},
	PARAMS_ERROR: {
		errCode: 1102,
		errMsg: 'PARAMS_ERROR',
	},
	USER_REPEAT: {
		errCode: 1201,
		errMsg: 'USER_REPEAT',
	},
	USER_NOT_EXIST: {
		errCode: 1202,
		errMsg: 'USER_NOT_EXIST',
	},
	USER_LOGIN_PARAMS_ERROR: {
		errCode: 1203,
		errMsg: 'USER_LOGIN_PARAMS_ERROR',
	},
	REQUIRED_JSON: {
		errCode: 1301,
		errMsg: 'REQUIRED_JSON',
	},
	UNKOWN_ERROR: {
		errCode: 1302,
		errMsg: 'UNKOWN_ERROR',
	},
	NET_TYPE_REPEAT: {
		errCode: 1303,
		errMsg: 'NET_TYPE_REPEAT',
	},
	DENIED: {
		errCode: 1304,
		errMsg: 'DENIED',
	},
	REPEAT: {
		errCode: 1306,
		errMsg: 'REPEAT',
	},
	EMPTY: {
		errCode: 1307,
		errMsg: 'EMPTY',
	},
	MODIFY_ERROR: {
		errCode: 1308,
		errMsg: 'MODIFY_ERROR',
	},
	NETWORK_OR_SERVER_ERROR: {
		errCode: 1311,
		errMsg: 'Network error or Server not response!',
	},
	IP_FORMAT_ERROR: {
		errCode: 1309,
		errMsg: 'IP_FORMAT_ERROR',
	},
}

// IP_FORMAT_ERROR = {
// 	errCode: 909,
// 	errMsg: 'IP_FORMAT_ERROR',
// }

// // 不在同一地址段not in the same address range
// NOT_IN_THE_SAME_ADDRESS_RANGE = {
// 	errCode: 909,
// 	errMsg: 'NOT_IN_THE_SAME_ADDRESS_RANGE',
// }

// // 不存在的网络类型
// NET_TYPE_NOT_EXIST = {
// 	errCode: 910,
// 	errMsg: 'NET_TYPE_NOT_EXIST',
// }

// // 不存在的ip地址
// IP_ADDRESS_NOT_EXIST = {
// 	errCode: 911,
// 	errMsg: 'IP_ADDRESS_NOT_EXIST',
// }

// interface FlaseRes extends ErrorRes {
// 	success: false
// }
//
