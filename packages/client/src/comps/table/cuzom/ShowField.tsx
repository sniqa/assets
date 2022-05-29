import React, { Fragment, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Switch, Typography } from '@mui/material'
import { TableInstance } from '@tanstack/react-table'
import CuzomSwitch from '../../CuzomSwitch'

const SHOW_FIELD = `显示/隐藏字段`

interface ShowFieldProps {
	tableInstance: TableInstance<any>
}

const ShowField = (props: ShowFieldProps) => {
	const { tableInstance } = props

	const [expanded, setExpanded] = useState(false)

	return (
		<Fragment>
			<Accordion expanded={expanded} disableGutters elevation={0}>
				<AccordionSummary>
					<Button onClick={() => setExpanded(!expanded)}>{SHOW_FIELD}</Button>
				</AccordionSummary>

				<AccordionDetails>
					<div className="flex flex-wrap">
						{tableInstance.getAllLeafColumns().map((column) => {
							return (
								<div key={column.id} className="px-1">
									<CuzomSwitch
										checked={column.getIsVisible()}
										onChange={column.getToggleVisibilityHandler()}
										label={column.id}
									/>
								</div>
							)
						})}
					</div>
				</AccordionDetails>
			</Accordion>
		</Fragment>
	)
}

export default ShowField
