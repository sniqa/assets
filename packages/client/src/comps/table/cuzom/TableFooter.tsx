import { TablePagination } from '@mui/material'
import React from 'react'

const LABEL_ROWS_PER_PAGE = '每页行数：'

interface TableFooterProps {
	count?: number
	currentPage?: number
}

const TableFooterPagination = (props: TableFooterProps) => {
	const { count = 100, currentPage = 0 } = props

	const [page, setPage] = React.useState(currentPage)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<TablePagination
			component="div"
			count={count}
			page={page}
			labelRowsPerPage={LABEL_ROWS_PER_PAGE}
			onPageChange={handleChangePage}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={handleChangeRowsPerPage}
		/>
	)
}

export default TableFooterPagination
