import {
	useTableInstance,
	getCoreRowModel,
	Table,
	createTable,
	sortingFns,
	getPaginationRowModel,
	getFilteredRowModel,
	Row,
	AccessorFn,
	TableInstance,
	ColumnDef,
	ColumnFiltersState,
} from '@tanstack/react-table'

import { RankingInfo, rankItem, compareItems, rankings } from '@tanstack/match-sorter-utils'

import AnimateWraper from '../animate/AnimateWraper'
import { useEffect, useState } from 'react'
import MyTable from './Table'

import { defaultScrollbar } from '../../config'
import TableToolbar from './TableToolbar'

interface CuzomTableProps {
	columns: ColumnDef<any>[]
	data: any[]
	table: Table<any>
	deleteSelection?: (rows: Row<any>[]) => void
	addDate?: <T>(data: T) => void
}

export const createCuzomTable = <T extends Record<string, any> = {}>() =>
	createTable()
		.setRowType<T>()
		.setFilterMetaType<RankingInfo>()
		.setOptions({
			filterFns: {
				fuzzy: (row, columnId, value, addMeta) => {
					// Rank the item
					const itemRank = rankItem(row.getValue(columnId), value, {
						threshold: rankings.MATCHES,
					})

					// Store the ranking info
					addMeta(itemRank)

					// Return if the item should be filtered in/out
					return itemRank.passed
				},
			},
			sortingFns: {
				fuzzy: (rowA, rowB, columnId) => {
					let dir = 0

					// Only sort by rank if the column has ranking information
					if (rowA.columnFiltersMeta[columnId]) {
						dir = compareItems(rowA.columnFiltersMeta[columnId]!, rowB.columnFiltersMeta[columnId]!)
					}

					// Provide a fallback for when the item ranks are equal
					return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
				},
			},
		})

const CuzomTable = (props: CuzomTableProps) => {
	const { columns, data, table, deleteSelection = () => {}, addDate = () => {} } = props

	const [columnVisibility, setColumnVisibility] = useState({})

	const [globalFilter, setGlobalFilter] = useState('')

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const [rowSelection, setRowSelection] = useState({})

	const instance = useTableInstance(table, {
		data,
		columns,
		columnResizeMode: 'onChange',
		state: {
			columnVisibility,
			rowSelection,
			columnFilters,
			globalFilter,
		},
		globalFilterFn: 'fuzzy',
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		onColumnVisibilityChange: setColumnVisibility,
	})

	return (
		<AnimateWraper className="bg-light-50 flex flex-col  rounded-2xl">
			{/* toolbar */}
			<section>
				<TableToolbar
					instance={instance}
					deleteSelection={deleteSelection}
					globalFilter={setGlobalFilter}
					columnFilters={setColumnFilters}
					addData={addDate}
				/>
			</section>

			<section className={`flex-grow overflow-auto ${defaultScrollbar}`}>
				<MyTable instance={instance} rowSelection={rowSelection} data={data} />
			</section>
		</AnimateWraper>
	)
}

export default CuzomTable
