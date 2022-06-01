import { Typography, TablePagination } from '@mui/material'
import { TableInstance } from '@tanstack/react-table'
import { Fragment } from 'react'

interface TableFooterProps {
	instance: TableInstance<any>
	rowCount: number
	rowSelection?: number
}

const LABEL_ROWS_PER_PAGE = '每页行数：'

const TableFooter = (porps: TableFooterProps) => {
	const {
		instance: { getState, setPageIndex, setPageSize },
		rowCount,
		rowSelection = 0,
	} = porps

	return (
		<tfoot>
			<tr className={`flex justify-between`}>
				<td>
					<Typography>{`${rowSelection} of ${rowCount} Total Rows Selected`}</Typography>
				</td>

				<td>
					<TablePagination
						component="div"
						count={rowCount}
						page={getState().pagination.pageIndex}
						labelRowsPerPage={LABEL_ROWS_PER_PAGE}
						onPageChange={(e, index) => setPageIndex(index)}
						rowsPerPage={getState().pagination.pageSize}
						onRowsPerPageChange={(e) => {
							setPageSize(Number(e.target.value))
						}}
					/>
				</td>
			</tr>
		</tfoot>
	)
}

export default TableFooter
