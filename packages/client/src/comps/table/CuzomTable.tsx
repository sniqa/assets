import {
	useTableInstance,
	getCoreRowModel,
	Table,
	getPaginationRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table'
import AnimateWraper from '../animate/AnimateWraper'
import { useState } from 'react'
import MyTable from './Table'

import ShowField from './ShowField'
import { defaultScrollbar } from '../../config'
import TableToolbar from './TableToolbar'

interface CuzomTableProps {
	table: Table<any>
	columns: any[]
	data: any[]
}

const CuzomTable = ({ columns, data, table }: CuzomTableProps) => {
	const [columnVisibility, setColumnVisibility] = useState({})

	const [rowSelection, setRowSelection] = useState({})

	const instance = useTableInstance(table, {
		data,
		columns,
		columnResizeMode: 'onChange',
		state: {
			columnVisibility,
			rowSelection,
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
	})

	return (
		<AnimateWraper className="bg-light-50 rounded-xl flex flex-col">
			{/* toolbar */}
			<section>
				<TableToolbar instance={instance} />
				{/* <ShowField tableInstance={instance}></ShowField> */}
			</section>

			<section className={`flex-grow overflow-x-auto ${defaultScrollbar}`}>
				<div className="h-full">
					<MyTable instance={instance} rowSelection={rowSelection} data={data} />
				</div>
			</section>
		</AnimateWraper>
	)
}

export default CuzomTable
