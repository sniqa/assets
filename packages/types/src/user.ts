import { WithId } from './common'

// 用户信息
export interface UserInfo {
	account?: string
	username?: string

	nickname?: string
	number?: number
	department?: string
}

export type UserInfoWitId = UserInfo & WithId

// export interface UserController {
// 	createUser: (data: Partial<UserInfo>) => Promise<Res<UserInfo> | ResError>
// 	deleteUser: (data: Partial<UserInfo>) => Promise<Res<boolean> | ResError>
// 	findUser: (data: Partial<UserInfo> | {}) => Promise<Res<Array<UserInfo>> | ResError>
// 	modifyUser: (data: Partial<UserInfo>) => Promise<Res<UserInfo> | ResError>
// }

// const gen = (controllers: UserController) => {
// 	const res = Object.values(controllers).map((controller: UserController[keyof Partial<UserController>]) => {
// 		const query = {
// 			[controller.name]: controller.arguments[0],
// 		}

// 		return fetch('', { body: JSON.stringify(query), method: 'POST' }).then((res) => res.ok && res.json())
// 	})

// 	return res
// }
