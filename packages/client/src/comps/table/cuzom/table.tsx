import {
	createTable,
	useTableInstance,
	ColumnResizeMode,
	getCoreRowModel,
	ReactTableGenerics,
	Table,
} from '@tanstack/react-table'
import { defaultScrollbar, defaultScrollbar2 } from '../../../config'
import { Typography } from '@mui/material'
import TableFooterPagination from './TableFooter'
import AnimateWraper from '../../animate/AnimateWraper'
import { useState } from 'react'

import ShowField from './ShowField'

interface CuzomTableProps {
	table: Table<any>
	columns: any[]
	data: any[]
}

const SHOW_FIELD = `显示/隐藏字段`

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
		onColumnVisibilityChange: setColumnVisibility,
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	})

	return (
		<AnimateWraper className="bg-light-50 rounded-xl p-2 flex flex-col">
			{/* toolbar */}
			<section>
				<ShowField tableInstance={instance}></ShowField>
			</section>

			<section className={`flex-grow overflow-x-scroll ${defaultScrollbar} `}>
				<table className={`min-h-full flex flex-col rounded-xl border`}>
					{/* 表格头部 */}
					<thead className={`flex overflow-y-scroll  items-center ${defaultScrollbar2}`}>
						{instance.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className={` flex justify-center`}>
								{headerGroup.headers.map((header) => (
									<th
										{...{
											key: header.id,
											colSpan: header.colSpan,
											style: {
												width: header.getSize(),
											},
										}}
										className={`h-3rem leading-3rem relative`}
									>
										{header.isPlaceholder ? null : header.renderHeader()}
										<div
											{...{
												onMouseDown: header.getResizeHandler(),
												onTouchStart: header.getResizeHandler(),
												className: `resizer`,
											}}
										/>
									</th>
								))}
							</tr>
						))}
					</thead>

					{/* 表格内容 */}
					<tbody className={`flex-grow overflow-y-auto ${defaultScrollbar}`}>
						{instance.getRowModel().rows.map((row) => (
							<tr key={row.id} className={``}>
								{row.getVisibleCells().map((cell) => (
									<td
										{...{
											key: cell.id,
											style: {
												width: cell.column.getSize(),
											},
										}}
										className={`border h-3rem leading-3rem`}
									>
										{cell.renderCell()}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</section>

			{/* 底部 */}
			<section className="flex justify-between items-center">
				<Typography>{`${0} of ${100} Total Rows Selected`}</Typography>
				<TableFooterPagination />
			</section>
		</AnimateWraper>
	)
}

export default CuzomTable
