import { TableInstance } from '@tanstack/react-table'

interface DownloadTable {
	instance: TableInstance<any>
	filename?: string
}

export const downloadTable = ({ instance, filename = new Date().getTime().toString() }: DownloadTable) => {
	const data = instance.getSelectedRowModel().rows.map((row) => row._valuesCache)

	const header = instance
		.getAllColumns()
		.map((column) => column.columnDefType === 'data' && getValueForHeader(column.columnDef.header))
		.filter((col) => col)

	const fromatData = [header.join(',')].concat(
		data.map((item) =>
			Object.values(item)
				.map((val) => (val ? `${val}` : ''))
				.join(',')
		)
	)

	createCsvFile(fromatData, filename)
}

// 创建并下载csv文件
const createCsvFile = (data: string[], filename: string) => {
	const blob = new Blob(['\ufeff' + data.join('\n')], { type: 'text/csv,charset=UTF-8' })

	const link = document.createElement('a')

	link.href = URL.createObjectURL(blob)

	link.download = `${filename}.csv`

	link.click()
}

export const getValueForHeader = (header?: any) => {
	if (typeof header === 'function') {
		return header().props.children
	} else if (typeof header === 'string') {
		return header
	}

	return ''
}
