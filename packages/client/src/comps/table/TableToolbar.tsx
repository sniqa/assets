import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Dialog,
	IconButton,
	TextField,
	Tooltip,
	Typography,
	Color,
} from '@mui/material'
import { Dispatch, useMemo, useState } from 'react'
import AnimateWraper from '../animate/AnimateWraper'
import { ColumnFiltersState, filterFns, Row, TableInstance } from '@tanstack/react-table'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import ShowField from './ShowField'
import AddDialog from './AddDialog'
import { downloadTable } from './share'
import { notice } from '../../apis/mitt'

const SEARCH_INDEX = 0
const FILTER_INDEX = 1
const ADD_INDEX = 2

const SEARCH_ICON_TOOLTIP = '查找字段'
const FILTER_ICON_TOOLTIP = '过滤字段'
const DELETE_SELECTION_ROWS_TOOLTIP = '删除所选'
const ADD_TOOLTIP = '添加'
const FILE_DOWNLOAD_TOOLTIP = '导出至csv文件'
const FILE_UPLOAD_TOOLTIP = '导入文件'

interface TableToolbarProps {
	instance: TableInstance<any>
	deleteSelection?: (selectionRow: Row<any>[]) => void
	globalFilter?: Dispatch<React.SetStateAction<string>>
	columnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
	addData?: <T>(data: T) => void
}

const TableToolbar = ({
	instance,
	deleteSelection = () => {},
	globalFilter = () => {},
	addData = () => {},
	columnFilters = () => {},
}: TableToolbarProps) => {
	const [expanded, setExpanded] = useState(false)

	const [curDisplay, setCurDisplay] = useState(0)

	const [dialogOpen, setDialogOpen] = useState(false)

	const openAndDisplay = (curIndex: number) => {
		expanded ? curDisplay === curIndex && setExpanded(false) : setExpanded(true), setCurDisplay(curIndex)
	}

	const selectionRows = instance.getSelectedRowModel().rows

	const isSelectionEmpty = useMemo(() => selectionRows.length === 0, [selectionRows])

	const disabledStatus = useMemo(
		() => (isSelectionEmpty ? { color: 'disabled', cursor: 'cursor-not-allowed' } : { color: 'primary', cursor: '' }),
		[isSelectionEmpty]
	)

	const deleteSelectRows = () => {
		deleteSelection(selectionRows)
		instance.resetRowSelection()
	}

	return (
		<Accordion expanded={expanded} elevation={0}>
			{/* 显示图标 */}
			<AccordionSummary sx={{ display: 'flex' }}>
				<section className="flex justify-center items-center">
					<Tooltip title={DELETE_SELECTION_ROWS_TOOLTIP}>
						<div className={disabledStatus.cursor}>
							<IconButton onClick={() => deleteSelectRows()} disabled={isSelectionEmpty}>
								{isSelectionEmpty ? <DeleteOutlineIcon color="action" /> : <DeleteIcon />}
							</IconButton>
						</div>
					</Tooltip>

					{/* 添加 */}
					<Tooltip title={ADD_TOOLTIP}>
						<IconButton
							onClick={() => {
								setCurDisplay(ADD_INDEX), setDialogOpen(true)
							}}
						>
							<AddIcon color="primary" />
						</IconButton>
					</Tooltip>

					{/* 导出至csv文件 */}
					<Tooltip title={FILE_DOWNLOAD_TOOLTIP}>
						<div className={disabledStatus.cursor}>
							<IconButton
								onClick={() => {
									notice({ status: 'success', message: '导出成功, 请稍后...' })
									downloadTable({ instance })
								}}
								disabled={isSelectionEmpty}
							>
								<FileDownloadIcon color={disabledStatus.color as any} />
							</IconButton>
						</div>
					</Tooltip>

					{/* 导入文件 */}
					<Tooltip title={FILE_UPLOAD_TOOLTIP}>
						<div className="cursor-not-allowed">
							<IconButton disabled>
								<FileUploadIcon color={`disabled`} />
							</IconButton>
						</div>
					</Tooltip>
				</section>

				<section className="flex-grow" />

				<section>
					<Tooltip title={SEARCH_ICON_TOOLTIP}>
						<IconButton onClick={() => openAndDisplay(SEARCH_INDEX)}>
							<SearchIcon color="primary" />
						</IconButton>
					</Tooltip>

					<Tooltip title={FILTER_ICON_TOOLTIP}>
						<IconButton onClick={() => openAndDisplay(FILTER_INDEX)}>
							<FilterListIcon color="primary" />
						</IconButton>
					</Tooltip>
				</section>
			</AccordionSummary>

			{/* 内容 */}
			<AccordionDetails>
				{(() => {
					switch (curDisplay) {
						case SEARCH_INDEX:
						default:
							return (
								<div className="flex justify-center">
									<TextField size="small" label={`查找`} onChange={(e) => globalFilter(e.target.value)} />
								</div>
							)

						case FILTER_INDEX:
							return <ShowField tableInstance={instance} />

						case ADD_INDEX:
							return <AddDialog instance={instance} open={dialogOpen} close={setDialogOpen} addData={addData} />
					}
				})()}
			</AccordionDetails>
		</Accordion>
	)
}

export default TableToolbar
