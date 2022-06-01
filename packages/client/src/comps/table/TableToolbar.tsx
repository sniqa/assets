import SearchIcon from '@mui/icons-material/Search'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import FilterListIcon from '@mui/icons-material/FilterList'
import FilterListOffIcon from '@mui/icons-material/FilterListOff'
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip } from '@mui/material'
import { useState } from 'react'
import AnimateWraper from '../animate/AnimateWraper'
import { TableInstance } from '@tanstack/react-table'

import ShowField from './ShowField'

const SEARCH_INDEX = 0
const FILTER_INDEX = 1

const SEARCH_ICON_TOOLTIP = '查找字段'
const FILTER_ICON_TOOLTIP = '过滤字段'

interface TableToolbarProps {
	instance: TableInstance<any>
}

const TableToolbar = ({ instance }: TableToolbarProps) => {
	const [expanded, setExpanded] = useState(false)

	const [curDisplay, setCurDisplay] = useState(0)

	const openAndDisplay = (curIndex: number) => {
		expanded ? curDisplay === curIndex && setExpanded(false) : setExpanded(true), setCurDisplay(curIndex)
	}

	return (
		<Accordion expanded={expanded} elevation={0}>
			{/* 显示图标 */}
			<AccordionSummary>
				<div className="flex justify-end w-full">
					<Tooltip title={SEARCH_ICON_TOOLTIP}>
						<IconButton onClick={() => openAndDisplay(SEARCH_INDEX)}>
							<SearchIcon />
						</IconButton>
					</Tooltip>

					<Tooltip title={FILTER_ICON_TOOLTIP}>
						<IconButton onClick={() => openAndDisplay(FILTER_INDEX)}>
							<FilterListIcon />
						</IconButton>
					</Tooltip>
				</div>
			</AccordionSummary>

			{/* 内容 */}
			<AccordionDetails>
				{(() => {
					switch (curDisplay) {
						case SEARCH_INDEX:
						default:
							return <div>search</div>

						case FILTER_INDEX:
							return <ShowField tableInstance={instance} />
					}
				})()}
			</AccordionDetails>
		</Accordion>
	)
}

export default TableToolbar
