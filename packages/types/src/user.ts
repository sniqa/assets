import { WithId } from './common'

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

// 用户信息
export interface UserInfo {
	account?: string
	username?: string
	nickname?: string
	number?: number
	departmen?: string
}

export type UserInfoWitId = UserInfo & WithId

export interface UserController {
	createUser: (data: Partial<UserInfo>) => Promise<Res<UserInfo> | ResError>
	deleteUser: (data: Partial<UserInfo>) => Promise<Res<boolean> | ResError>
	findUser: (data: Partial<UserInfo> | {}) => Promise<Res<Array<UserInfo>> | ResError>
	modifyUser: (data: Partial<UserInfo>) => Promise<Res<UserInfo> | ResError>
}

const gen = (controllers: UserController) => {
	const res = Object.values(controllers).map((controller: UserController[keyof Partial<UserController>]) => {
		const query = {
			[controller.name]: controller.arguments[0],
		}

		return fetch('', { body: JSON.stringify(query), method: 'POST' }).then((res) => res.ok && res.json())
	})

	return res
}
