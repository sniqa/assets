export * from './user'
export * from './response'
export * from './ipType'

// Response success
export interface Res<T> {
	success: boolean
	data: T
}

// Response error
export interface ResError {
	success: boolean
	errcode: number
	errmsg: string
}
