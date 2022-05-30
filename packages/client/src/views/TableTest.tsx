import { Checkbox } from '@mui/material'
import { createTable } from '@tanstack/react-table'
import { HTMLAttributes, useEffect, useRef } from 'react'
import CuzomTable from '../comps/table/cuzom/table'
import { makeData } from '../comps/table/makeData'

type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: string
	progress: number
}

let table = createTable().setRowType<Person>()

const defaultData: Person[] = makeData(108)

const defaultColumns = [
	table.createDisplayColumn({
		id: 'select',
		header: ({ instance }) => (
			<CuzomCheckbox
				{...{
					checked: instance.getIsAllRowsSelected(),
					indeterminate: instance.getIsSomeRowsSelected(),
					onChange: instance.getToggleAllRowsSelectedHandler(),
				}}
			/>
		),
		cell: ({ row }) => (
			<div className="px-1">
				<CuzomCheckbox
					{...{
						checked: row.getIsSelected(),
						indeterminate: row.getIsSomeSelected(),
						onChange: row.getToggleSelectedHandler(),
					}}
				/>
			</div>
		),
	}),
	table.createDataColumn('firstName', {
		cell: (info) => info.getValue(),
		footer: (props) => props.column.id,
	}),
	table.createDataColumn((row) => row.lastName, {
		id: 'lastName',
		cell: (info) => info.getValue(),
		header: () => <span>Last Name</span>,
		footer: (props) => props.column.id,
	}),

	table.createDataColumn('age', {
		header: () => 'Age',
		footer: (props) => props.column.id,
	}),

	table.createDataColumn('visits', {
		header: () => <span>Visits</span>,
		footer: (props) => props.column.id,
	}),
	table.createDataColumn('status', {
		header: 'Status',
		footer: (props) => props.column.id,
	}),
	table.createDataColumn('progress', {
		header: 'Profile Progress',
		footer: (props) => props.column.id,
	}),
]

const Table = () => {
	return <CuzomTable table={table} columns={defaultColumns} data={defaultData}></CuzomTable>
}

export default Table

const CuzomCheckbox = ({
	indeterminate,
	className = '',
	...rest
}: { indeterminate?: boolean } & HTMLAttributes<HTMLInputElement>) => {
	const ref = useRef<HTMLInputElement>(null!)

	useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = indeterminate
		}
	}, [ref, indeterminate])

	return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />
}
