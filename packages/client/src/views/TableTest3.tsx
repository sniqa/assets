import { Button, ButtonGroup, Checkbox } from '@mui/material'
import { createTable } from '@tanstack/react-table'
import { Fragment, HTMLAttributes, useEffect, useRef } from 'react'
import CuzomTable from '../comps/table/CuzomTable'
import { makeData } from '../comps/table/makeData'

import { createRowSelection } from '../comps/table/cuzom/createTableColumns'

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
	table.createDisplayColumn(createRowSelection()),
	table.createDataColumn('firstName', {
		cell: (info) => info.getValue(),
		footer: (props) => props.column.id,
	}),
	table.createDataColumn('lastName', {
		id: 'lastName',
		cell: (info) => info.getValue(),
		header: () => <span>Last Name</span>,
		footer: (props) => props.column.id,
	}),

	table.createDataColumn('age', {
		header: () => 'Agess',
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
	table.createDisplayColumn({
		id: 'opration',
		size: 200,
		header: ({ instance }) => <div className="">操作</div>,
		cell: ({ row }) => (
			<Fragment>
				<Button className="" onClick={() => console.log(row)}>
					编辑
				</Button>
			</Fragment>
		),
	}),
]

const Table = () => {
	return <CuzomTable table={table} columns={defaultColumns} data={defaultData}></CuzomTable>
}

export default Table
