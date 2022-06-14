import { useEffect, useMemo, useState } from 'react'
import type { NetTypeInfoWithId, NetTypeInfo } from '@assets/types'
import Table, { createRowSelection, createTableInstance, TableToolbarExtensions } from '../../../comps/table'
import { Row } from '@tanstack/react-table'
import AddIcon from '@mui/icons-material/Add'
import { useAppSelector, useAppDispatch } from '../../../store'
import NetTypeDetail from './NetTypeDetail'
import { _fetch } from '../../../apis/fetch'
import { notice } from '../../../apis/mitt'
import { addNetType, deleteManyNetType, setNetTypes, updateNetType } from '../../../store/netTypes'
import { Button } from '@mui/material'

const table = createTableInstance<NetTypeInfoWithId>()

const NET_TYPE_ADD_INDEX = 2
const NET_TYPE_EDIT_INDEX = 3

const IpType = () => {
	const netTypes = useAppSelector((state) => state.netTypes)

	const dispatch = useAppDispatch()

	const [curDisplayIndex, setCurDisplayIndex] = useState(0)

	const [curNetTypeInfo, setCurNetTypeInfo] = useState<NetTypeInfoWithId>({})

	const editBtnClick = (index: number, netType: NetTypeInfoWithId) => {
		setCurNetTypeInfo(netType)
		setCurDisplayIndex(index)
	}

	const columns = useMemo(
		() => [
			table.createDisplayColumn(createRowSelection()),
			table.createDataColumn('typeName', {
				header: () => <span className="">{`类型名称`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('ipStart', {
				header: () => <span className="">{`开始地址`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('ipEnd', {
				header: () => <span className="">{`结束地址`}</span>,
				cell: (info) => info.getValue(),
			}),

			table.createDataColumn('netmask', {
				header: () => <span className="">{`掩码`}</span>,
				cell: (info) => info.getValue(),
			}),

			table.createDataColumn('gateway', {
				header: () => <span className="">{`网关`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('dns', {
				header: () => <span className="">{`dns`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDataColumn('desc', {
				header: () => <span className="">{`描述`}</span>,
				cell: (info) => info.getValue(),
			}),
			table.createDisplayColumn({
				id: 'opration',
				header: () => <span className="">{`操作`}</span>,
				cell: (info) => (
					<div className="">
						<Button onClick={() => editBtnClick(NET_TYPE_EDIT_INDEX, info.row.original || {})}>{`编辑`}</Button>
					</div>
				),
			}),
		],
		[]
	)

	const leftExtensions: TableToolbarExtensions = useMemo(
		() => [
			{
				title: '添加网络类型',
				icon: <AddIcon color="primary" />,
				onClick: () => setCurDisplayIndex(NET_TYPE_ADD_INDEX),
			},
		],
		[]
	)

	const addNetTypeCallback = async (data: NetTypeInfoWithId) => {
		const { createNetType } = await _fetch({ createNetType: data })

		console.log(createNetType)

		if (createNetType.success) {
			dispatch(addNetType({ ...data, _id: createNetType.data.insertedId }))

			notice({
				status: 'success',
				message: '创建网络类型成功',
			})
		} else {
			notice({
				status: 'error',
				message: createNetType.errMsg,
			})
		}
	}

	const deleteSelection = async (rows: Row<any>[]) => {
		const data = rows.map((row) => row.original)

		const { deleteNetTypes } = await _fetch({ deleteNetTypes: data })

		if (deleteNetTypes.success) {
			dispatch(deleteManyNetType(data))

			return notice({
				status: 'success',
				message: '删除成功',
			})
		}

		notice({
			status: 'error',
			message: '删除失败',
		})
	}

	const modifyNetType = async (data: Partial<NetTypeInfoWithId>) => {
		const { modifyNetType } = await _fetch({ modifyNetType: data })

		console.log(modifyNetType)

		if (modifyNetType.success) {
			dispatch(updateNetType(modifyNetType.data))

			return notice({
				status: 'success',
				message: '修改成功',
			})
		}

		notice({
			status: 'error',
			message: '修改失败',
		})
	}

	useEffect(() => {
		const fetchNetTypes = async () => {
			const { findNetType } = await _fetch({ findNetType: {} })

			findNetType.success && dispatch(setNetTypes(findNetType.data))
		}

		netTypes.length === 0 && fetchNetTypes()
	}, [])

	return (
		<div className="flex-grow flex">
			<Table
				columns={columns}
				data={netTypes}
				table={table}
				toolbar={{
					deleteSelection,
					leftExtensions,
				}}
			/>

			<section className="">
				{(() => {
					switch (curDisplayIndex) {
						case NET_TYPE_ADD_INDEX:
							return (
								<NetTypeDetail
									title={'添加网络类型'}
									open={curDisplayIndex === NET_TYPE_ADD_INDEX}
									close={() => setCurDisplayIndex(0)}
									onClick={(netType) => addNetTypeCallback(netType)}
								/>
							)
						case NET_TYPE_EDIT_INDEX:
							return (
								<NetTypeDetail
									title={'添加网络类型'}
									open={curDisplayIndex === NET_TYPE_EDIT_INDEX}
									close={() => setCurDisplayIndex(0)}
									onClick={(netType) => modifyNetType(netType)}
									netTypeInfo={curNetTypeInfo}
								/>
							)
					}
				})()}
			</section>
		</div>
	)
}

export default IpType
