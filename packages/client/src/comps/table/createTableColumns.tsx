import CuzomCheckbox from './CuzomCheckbox'

export const createRowSelection = () => {
	return {
		id: 'select',
		size: 50,
		header: ({ instance }: any) => (
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
		cell: ({ row }: any) => (
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
	}
}
