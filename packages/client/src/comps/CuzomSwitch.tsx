import { FormControlLabel, Switch } from '@mui/material'
import { ChangeEvent } from 'react'

interface CuzomSwitchProps {
	checked?: boolean
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void
	label?: string
}

const CuzomSwitch = (props: CuzomSwitchProps) => {
	const { checked = true, onChange = () => {}, label = '' } = props

	return <FormControlLabel control={<Switch checked={checked} onChange={onChange} />} label={label} />
}

export default CuzomSwitch
