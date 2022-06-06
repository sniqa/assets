import { useMemo, useState } from 'react'
import type { IpTypeInfoWithId, IpTypeInfo } from '@assets/types'
import Table, { createRowSelection, createCuzomTable } from '../../comps/table'
import { Row } from '@tanstack/react-table'

const table = createCuzomTable<IpTypeInfoWithId>()

const IpType = () => {
	const [rows, setRows] = useState([])

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
		],
		[]
	)

	const addIpType = (data: IpTypeInfoWithId) => {}

	const deleteSelection = (rows: Row<any>[]) => {}

	return <Table columns={columns} data={rows} table={table} addDate={addIpType} deleteSelection={deleteSelection} />
}

export default IpType
