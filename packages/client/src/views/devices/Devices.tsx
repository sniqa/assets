import { useEffect, useMemo, useState } from 'react'
import Table, { createTableInstance, createRowSelection, TableToolbarExtensions } from '../../comps/table'
import { DeviceInfoWithId } from '@assets/types'
import { useAppDispatch, useAppSelector } from '../../store'
import { Button, Link } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import OutboxIcon from '@mui/icons-material/Outbox'
import { send } from '../../apis/ws'
import { staticPath, deviceInfoToolName } from '../../apis/serverConfig'
import DevicesDetail from './DevicesDetail'

const DEVICE_EDIT_INDEX = 2
const DEVICE_ADD_INDEX = 3

const table = createTableInstance<DeviceInfoWithId>()

const Devices = () => {
	const devices = useAppSelector((state) => state.devices)

	const dispatch = useAppDispatch()

	const [deviceDetailIndex, setDeviceDetailIndex] = useState(0)

	const [curDeviceDetailInfo, setCurDeviceDetailInfo] = useState<DeviceInfoWithId>({})

	const onDeviceDetail = (index: number, DeviceInfo: DeviceInfoWithId) => {
		setCurDeviceDetailInfo(DeviceInfo)
		setDeviceDetailIndex(index)
	}

	const columns = useMemo(
		() => [
			table.createDisplayColumn(createRowSelection()),
			table.createDataColumn('deviceName', {
				header: () => <span className="p-2">{`设备名称`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('deviceType', {
				header: () => <span className="p-2">{`设备类型`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('user', {
				header: () => <span className="p-2">{`使用人`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('location', {
				header: () => <span className="p-2">{`位置`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('ipType', {
				header: () => <span className="p-2">{`网络类型`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('useIp', {
				header: () => <span className="p-2">{`ip`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('desc', {
				header: () => <span className="p-2">{`备注`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDisplayColumn({
				id: 'opration',
				header: () => <span className="pl-2">{`操作`}</span>,
				cell: (info) => (
					<div className="">
						<Button onClick={() => onDeviceDetail(DEVICE_EDIT_INDEX, info.row.original || {})}>编辑</Button>
						<Button></Button>
					</div>
				),
			}),
		],
		[]
	)

	const extensions: TableToolbarExtensions = useMemo(
		() => [
			{
				title: '添加设备',
				icon: <AddIcon color="primary" />,
				onClick: () => setDeviceDetailIndex(DEVICE_ADD_INDEX)
			},
			{
				title: '设备信息收集工具',
				icon: <Link component={'a'} download target={`_blank`} href={`${staticPath}/${deviceInfoToolName}`} className={`w-full h-full flex justify-center items-center`}><OutboxIcon color="primary" /></Link> ,
				// onClick: () => wsTest(),
			},
		],
		[]
	)

	const deleteSelection = () => {}

	const addData = () => {}

	useEffect(() => {}, [])

	return (
		<div className="flex flex-grow bg-light-50">

			<Table
				columns={columns}
				data={devices}
				table={table}
				toolbar={{
					deleteSelection: deleteSelection,
					leftExtensions: extensions,
				}}
				/>

			<div className="">
				{(() => {
					switch(deviceDetailIndex){
						case DEVICE_EDIT_INDEX: {
							return <DevicesDetail title={'编辑设备'} open={deviceDetailIndex === DEVICE_EDIT_INDEX} close={() => setDeviceDetailIndex(0)} />
						}
						case DEVICE_ADD_INDEX: {
							return <DevicesDetail title={'添加设备'} open={deviceDetailIndex === DEVICE_ADD_INDEX} close={() => setDeviceDetailIndex(0)} />
						}
					}
				})()}
			</div>
		</div>
	)
}

export default Devices
