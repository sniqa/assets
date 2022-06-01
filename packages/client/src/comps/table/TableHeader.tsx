import { TableInstance } from '@tanstack/react-table'
import React from 'react'
import { defaultScrollbar2 } from '../../config'

interface TableHeaderProps {
	instance: TableInstance<any>
}

const TableHeader = ({ instance }: TableHeaderProps) => {
	return (
		<thead className={`flex items-center ${defaultScrollbar2} `}>
			{instance.getHeaderGroups().map((headerGroup) => (
				<tr key={headerGroup.id} className={` flex justify-center`}>
					{headerGroup.headers.map((header) => (
						<th
							{...{
								key: header.id,
								colSpan: header.colSpan,
								style: {
									width: header.getSize(),
								},
							}}
							className={`h-3rem leading-3rem relative border-bottom`}
						>
							{header.isPlaceholder ? null : header.renderHeader()}
							{header.id !== 'select' && (
								<div
									{...{
										onMouseDown: header.getResizeHandler(),
										onTouchStart: header.getResizeHandler(),
										className: `resizer`,
									}}
								/>
							)}
						</th>
					))}
				</tr>
			))}
		</thead>
	)
}

export default TableHeader
