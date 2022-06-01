import {
	createTable,
	useTableInstance,
	ColumnResizeMode,
	getCoreRowModel,
	ReactTableGenerics,
	Table,
	getPaginationRowModel,
	getFilteredRowModel,
} from '@tanstack/react-table'
import { defaultScrollbar, defaultScrollbar2 } from '../../../config'
import { TablePagination, Typography } from '@mui/material'
import TableFooterPagination from './TableFooter'
import AnimateWraper from '../../animate/AnimateWraper'
import { useState } from 'react'

import ShowField from '../ShowField'

const LABEL_ROWS_PER_PAGE = '每页行数：'

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
				<ShowField tableInstance={instance}></ShowField>
			</section>

			<section className={`flex-grow overflow-x-scroll ${defaultScrollbar}`}>
				<div className="h-full">
					<table className={`min-h-full flex flex-col rounded-xl  px-2`}>
						{/* 表格头部 */}
						<thead className={`flex  items-center ${defaultScrollbar2} `}>
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
											className={`h-3rem leading-3rem relative border-bottom`}
										>
											{header.isPlaceholder ? null : header.renderHeader()}
											{header.id !== 'select' && (
												<div
													{...{
														onMouseDown: header.getResizeHandler(),
														onTouchStart: header.getResizeHandler(),
														className: `resizer`,
													}}
												/>
											)}
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
											className={`border-bottom h-3rem leading-3rem`}
										>
											{cell.renderCell()}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			{/* 底部 */}
			<section className="flex justify-between items-center px-2">
				<Typography>{`${Object.keys(rowSelection).length} of ${data.length} Total Rows Selected`}</Typography>
				<TablePagination
					component="div"
					count={data.length}
					page={instance.getState().pagination.pageIndex}
					labelRowsPerPage={LABEL_ROWS_PER_PAGE}
					onPageChange={(e, index) => instance.setPageIndex(index)}
					rowsPerPage={instance.getState().pagination.pageSize}
					onRowsPerPageChange={(e) => {
						instance.setPageSize(Number(e.target.value))
					}}
				/>
			</section>
		</AnimateWraper>
	)
}

export default CuzomTable
