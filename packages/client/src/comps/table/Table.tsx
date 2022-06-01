import { TableInstance, RowSelectionState } from '@tanstack/react-table'

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableFooter from './TableFooter'
import { defaultScrollbar } from '../../config'

interface MyTableProps {
	instance: TableInstance<any>
	data: any[]
	rowSelection: RowSelectionState
}

const MyTable = ({ data, instance, rowSelection }: MyTableProps) => {
	return (
		<table className={`min-h-full flex flex-col rounded-xl  px-2 overflow-x-auto ${defaultScrollbar}`}>
			{/* 表格头部 */}
			{<TableHeader instance={instance} />}

			{/* 表格内容 */}
			{<TableBody instance={instance} />}

			{/* 表格底部 */}
			{<TableFooter instance={instance} rowCount={data.length} rowSelection={Object.keys(rowSelection).length} />}
		</table>
	)
}

export default MyTable
