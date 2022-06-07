import { TableInstance } from '@tanstack/react-table'
import { getValueForHeader } from './share'
import { FormControlLabel, Switch } from '@mui/material'
import { ChangeEvent } from 'react'

interface ShowFieldProps {
	tableInstance: TableInstance<any>
}

const ShowField = (props: ShowFieldProps) => {
	const { tableInstance } = props

	return (
		<div className="flex flex-wrap justify-start">
			{tableInstance.getAllLeafColumns().map((column) => {
				return (
					<div key={column.id} className="px-1">
						{column.columnDefType === 'data' && (
							<CuzomSwitch
								checked={column.getIsVisible()}
								onChange={column.getToggleVisibilityHandler()}
								label={getValueForHeader(column.columnDef.header)}
							/>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default ShowField

interface CuzomSwitchProps {
	checked?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	label?: string
}

const CuzomSwitch = (props: CuzomSwitchProps) => {
	const { checked = true, onChange = () => {}, label = '' } = props

	return <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label={label} />
}
