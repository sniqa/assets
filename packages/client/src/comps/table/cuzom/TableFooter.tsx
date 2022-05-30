import { TablePagination } from '@mui/material'
import React, { ChangeEvent, ChangeEventHandler, MouseEvent } from 'react'

const LABEL_ROWS_PER_PAGE = '每页行数：'

interface TableFooterProps {
	count?: number
	currentPage?: number
	rowsPerPage: number
	onRowsPerPageChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
	onPageChange: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const TableFooterPagination = (props: TableFooterProps) => {
	const { count = 100, currentPage = 0, rowsPerPage, onRowsPerPageChange, onPageChange } = props

	return (
		<TablePagination
			component="div"
			count={count}
			page={currentPage}
			labelRowsPerPage={LABEL_ROWS_PER_PAGE}
			onPageChange={(e) => onPageChange}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={onRowsPerPageChange}
		/>
	)
}

export default TableFooterPagination
