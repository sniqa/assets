import React, { Fragment, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Switch, Typography } from '@mui/material'
import { TableInstance } from '@tanstack/react-table'
import CuzomSwitch from './CuzomSwitch'
import AnimateWraper from '../animate/AnimateWraper'

interface ShowFieldProps {
	tableInstance: TableInstance<any>
}

const ShowField = (props: ShowFieldProps) => {
	const { tableInstance } = props

	return (
		<AnimateWraper className="flex flex-wrap">
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
		</AnimateWraper>
	)
}

export default ShowField
