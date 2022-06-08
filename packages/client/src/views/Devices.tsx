import { useEffect, useMemo, useState } from 'react'
import Table, { createTableInstance, createRowSelection } from '../comps/table'
import { DeviceInfoWithId } from '@assets/types'
import { useAppDispatch, useAppSelector } from '../store'
import { Button } from '@mui/material'

const table = createTableInstance<DeviceInfoWithId>()

const Devices = () => {
	const devices = useAppSelector((state) => state.devices)

	const dispatch = useAppDispatch()

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
				header: () => <span className="p-2">{`操作`}</span>,
				cell: (info) => (
					<div>
						<Button></Button>
						<Button>详情</Button>
						<Button></Button>
						<Button></Button>
						<Button></Button>
					</div>
				),
			}),
		],
		[]
	)

	const deleteSelection = () => {}

	const addData = () => {}

	useEffect(() => {}, [])

	return <Table columns={columns} data={devices} table={table} deleteSelection={deleteSelection} addData={addData} />
}

export default Devices
