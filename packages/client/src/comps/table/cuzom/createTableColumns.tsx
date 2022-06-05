import { Render, Table } from '@tanstack/react-table'

import CuzomCheckbox from './CuzomCheckbox'

export const createRowSelection = (table: Table<any>) => {
	return table.createDisplayColumn({
		id: 'select',
		size: 50,
		header: ({ instance }) => (
			<div className="text-center">
				<CuzomCheckbox
					{...{
						checked: instance.getIsAllRowsSelected(),
						indeterminate: instance.getIsSomeRowsSelected(),
						onChange: instance.getToggleAllRowsSelectedHandler(),
					}}
				/>
			</div>
		),
		cell: ({ row }) => (
			<div className="text-center">
				<CuzomCheckbox
					{...{
						checked: row.getIsSelected(),
						indeterminate: row.getIsSomeSelected(),
						onChange: row.getToggleSelectedHandler(),
					}}
				/>
			</div>
		),
	})
}
