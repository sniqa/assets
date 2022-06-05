import { hasKeys } from '@assets/share'
import { falseRes, trueRes, ErrorType } from '@assets/error'
import { UserInfo, UserInfoWitId } from '@assets/types'
import MongoDb from '../mongo'
import { ObjectId } from 'mongodb'

const USERS_COLLECTION_NAME = 'users'

const UserModel = MongoDb.collection<UserInfo>(USERS_COLLECTION_NAME)

// 创建用户
export const createUser = async (data: UserInfo) => {
	if (!hasKeys(data, 'username')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const hasUser = await UserModel.findOne({ username: data.username })

	if (hasUser) {
		return falseRes(ErrorType.USER_REPEAT)
	}

	const newUserId = await (await UserModel.insertOne(data)).insertedId

	const newUser = await UserModel.findOne({ _id: newUserId })

	return trueRes(newUser)
}

// 删除用户
export const deleteUsers = async (data: Array<Partial<UserInfoWitId>>) => {
	const ids = data.map((user) => new ObjectId(user._id))

	const res = await UserModel.deleteMany({ _id: { $in: ids } })

	return res.acknowledged ? trueRes(res) : falseRes(ErrorType.DENIED)
}

// 更新用户
export const modifyUser = async (data: Partial<UserInfoWitId>) => {
	if (!hasKeys(data, '_id')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const { _id, ...resInfo } = data

	const newUserInfo = await UserModel.findOneAndUpdate(
		{ _id: new ObjectId(_id) },
		{
			$set: resInfo,
		}
	)

	return newUserInfo.ok
		? trueRes(await UserModel.findOne({ _id: new ObjectId(_id) }))
		: falseRes(ErrorType.MODIFY_ERROR)
}

// 查找用户
export const findUser = async (data: Partial<UserInfoWitId>) => {
	const users = await UserModel.find(data).toArray()

	return trueRes(users)
}
