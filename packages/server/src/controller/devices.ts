import { falseRes, trueRes, ErrorType } from '@assets/error'
import { hasKeys } from '@assets/share'
import { DeviceInfoWithId, DeviceInfo, UploadDeviceInfo } from '@assets/types'
import { ObjectId } from 'mongodb'
import MongoDb from '../mongo'

const DEVICES_COLLECTION_NAME = 'devices'

const DeviceModel = MongoDb.collection<DeviceInfo>(DEVICES_COLLECTION_NAME)

// 上传设备信息
export const uploadDeviceInfo = async (data: UploadDeviceInfo) => {
	const { net } = data

	const defaultNet = net.find((netState) => netState.operstate === 'up')

	defaultNet?.ip4

	return data
}

// 创建设备
export const createDevice = async (data: DeviceInfo) => {
	if (!hasKeys(data, '')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const repeatDevice = await DeviceModel.findOne({})

	if (repeatDevice) {
		return falseRes(falseRes(ErrorType.REPEAT))
	}

	const res = await DeviceModel.insertOne(data)

	return res ? trueRes(res) : falseRes(ErrorType.DENIED)
}

// 删除设备
export const deleteDevice = async (data: Array<Partial<DeviceInfoWithId>>) => {
	const ids = data.map((device) => new ObjectId(device._id))

	const res = await DeviceModel.deleteMany({ _id: { $in: ids } })

	return res.acknowledged ? trueRes(res) : falseRes(ErrorType.DENIED)
}

// 修改设备信息
export const modifyDevice = async (data: Partial<DeviceInfoWithId>) => {
	if (!hasKeys(data, '_id')) {
		return falseRes(ErrorType.MISSING_PARAMS)
	}

	const { _id, ...resInfo } = data

	const newDevice = await DeviceModel.findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: resInfo })

	return newDevice.ok
		? trueRes(await DeviceModel.findOne({ _id: new ObjectId(_id) }))
		: falseRes(ErrorType.MODIFY_ERROR)
}

// 查找设备
export const findDevice = async (data: Record<string, any>) => {
	const res = await DeviceModel.find(data).toArray()

	return res ? trueRes(res) : falseRes(ErrorType.EMPTY)
}
