export interface ErrotTip {
	errCode: number
	errMsg: string
}

export interface TrueRes<T> {
	success: true
	data: T
}

export interface ErrorRes {
	[type: string]: ErrotTip
}
