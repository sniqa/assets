import { TableInstance } from '@tanstack/react-table'
import { defaultScrollbar } from '../../config'

interface TableBodyProps {
	instance: TableInstance<any>
}

const TableBody = ({ instance }: TableBodyProps) => {
	return (
		<tbody className={`flex-grow overflow-y-auto ${defaultScrollbar}`}>
			{instance.getRowModel().rows.map((row) => (
				<tr key={row.id} className={``}>
					{row.getVisibleCells().map((cell) => (
						<td
							{...{
								key: cell.id,
								style: {
									width: cell.column.getSize(),
								},
							}}
							className={`border-bottom h-3rem leading-3rem`}
						>
							{cell.renderCell()}
						</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

export default TableBody
