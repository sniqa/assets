import { falseRes, trueRes, ErrorType } from '@assets/error'
import { hasKeys } from '@assets/share'
import { ObjectId } from 'mongodb'
import MongoDb from '../mongo'
import { NetTypeInfoWithId, NetTypeInfo } from '@assets/types'

const NET_TYPE_COLLECTION_NAME = 'netTypes'

const NetTypeModel = MongoDb.collection<NetTypeInfo>(NET_TYPE_COLLECTION_NAME)

// 创建设备
export const createNetType = async (data: NetTypeInfo) => {
	if (!hasKeys(data, 'typeName', 'ipStart', 'netmask', 'gateway')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const repeatNetType = await NetTypeModel.findOne({ typeName: data.typeName })

	if (repeatNetType) {
		return falseRes(falseRes(ErrorType.REPEAT))
	}

	const res = await NetTypeModel.insertOne(data)

	return res ? trueRes(res) : falseRes(ErrorType.DENIED)
}

// 删除设备
export const deleteNetTypes = async (data: Array<Partial<NetTypeInfoWithId>>) => {
	const ids = data.map((device) => new ObjectId(device._id))

	const res = await NetTypeModel.deleteMany({ _id: { $in: ids } })

	return res.acknowledged ? trueRes(res) : falseRes(ErrorType.DENIED)
}

// 修改设备信息
export const modifyNetType = async (data: Partial<NetTypeInfoWithId>) => {
	if (!hasKeys(data, '_id')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const { _id, ...resInfo } = data

	const newDevice = await NetTypeModel.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: resInfo })

	return newDevice.ok
		? trueRes(await NetTypeModel.findOne({ _id: new ObjectId(_id) }))
		: falseRes(ErrorType.MODIFY_ERROR)
}

// 查找设备
export const findNetType = async (data: Record<string, any>) => {
	const res = await NetTypeModel.find(data).toArray()

	return res ? trueRes(res) : falseRes(ErrorType.EMPTY)
}
