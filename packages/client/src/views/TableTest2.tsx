// import { makeData, type Person } from '../comps/table/makeData'
// import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
// import AnimateWraper from '../comps/animate/AnimateWraper'

// const data = makeData(108)

// const columns: MRT_ColumnDef<Person>[] = [
// 	{ id: 'firstName', header: 'firstName' },
// 	{ id: 'age', header: 'age' },
// 	{ id: 'lastName', header: 'lastName' },
// ]

// const Table = () => {
// 	return (
// 		<AnimateWraper className="bg-green-500 overflow-hidden w-full h-full">
// 			<MaterialReactTable columns={columns} data={data}></MaterialReactTable>
// 		</AnimateWraper>
// 	)
// }

// export default Table

import React, { FC, useMemo } from 'react'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import AnimateWraper from '../comps/animate/AnimateWraper'
import { ColumnResizeMode } from '@tanstack/react-table'

const Example: FC = () => {
	const columns = useMemo(
		() =>
			[
				{
					header: 'First Name',
					id: 'firstName',
				},
				{
					header: 'Last Name',
					id: 'lastName',
				},
				{
					header: 'Address',
					id: 'address',
				},
				{
					header: 'City',
					id: 'city',
				},
				{
					header: 'State',
					id: 'state',
				},
			] as MRT_ColumnDef[],
		[]
	)

	const data = useMemo(
		() => [
			{
				firstName: 'Dylan',
				lastName: 'Murray',
				address: '261 Erdman Ford',
				city: 'East Daphne',
				state: 'Kentucky',
			},
			{
				firstName: 'Raquel',
				lastName: 'Kohler',
				address: '769 Dominic Grove',
				city: 'Columbus',
				state: 'Ohio',
			},
			{
				firstName: 'Ervin',
				lastName: 'Reinger',
				address: '566 Brakus Inlet',
				city: 'South Linda',
				state: 'West Virginia',
			},
			{
				firstName: 'Brittany',
				lastName: 'McCullough',
				address: '722 Emie Stream',
				city: 'Lincoln',
				state: 'Nebraska',
			},
			{
				firstName: 'Branson',
				lastName: 'Frami',
				address: '32188 Larkin Turnpike',
				city: 'Charleston',
				state: 'South Carolina',
			},
		],
		[]
	)
	return (
		<AnimateWraper className="w-full h-full">
			<div className="inline-block relative overflow-auto">
				<MaterialReactTable
					enableColumnResizing
					columns={columns}
					data={data}
					enableRowActions
					enableEditing
					enableRowSelection
					columnResizeMode="onChange"
				/>
			</div>
		</AnimateWraper>
	)
}

export default Example

const rtet: ColumnResizeMode = 'onChange'
