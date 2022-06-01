import { Render, Table } from '@tanstack/react-table'
import { ReactNode } from 'react'

import CuzomCheckbox from './CuzomCheckbox'

export const createRowSelection = () => {
	return {
		id: 'select',
		size: 50,

		header: ({ instance }: any) => (
			<CuzomCheckbox
				{...{
					checked: instance.getIsAllRowsSelected(),
					indeterminate: instance.getIsSomeRowsSelected(),
					onChange: instance.getToggleAllRowsSelectedHandler(),
				}}
			/>
		),
		cell: ({ row }: any) => (
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
	}
}
