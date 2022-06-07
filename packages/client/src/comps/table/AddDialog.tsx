import { Button, Dialog, Divider, Slide, TextField, Typography, IconButton } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { Column, Header, Renderable, TableInstance } from '@tanstack/react-table'
import { Dispatch, forwardRef, useState } from 'react'
import AnimateWraper from '../animate/AnimateWraper'
import CloseIcon from '@mui/icons-material/Close'
import { getValueForHeader } from './share'

interface AddDialogProps {
	instance: TableInstance<any>
	open: boolean
	close: Dispatch<React.SetStateAction<boolean>>
	addData?: <T>(data: T) => void
}

const AddDialog = ({ instance, open, close, addData = () => {} }: AddDialogProps) => {
	const [value, setValue] = useState({})

	const onClick = () => {
		addData(value)
	}

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={() => close(false)}
			aria-describedby="alert-dialog-slide-description"
			fullWidth
			maxWidth={`sm`}
		>
			<section className="flex justify-between px-4 py-2">
				<Typography color={`primary`} fontSize="1.8rem">{`添加`}</Typography>

				<IconButton onClick={() => close(false)}>
					<CloseIcon />
				</IconButton>
			</section>

			<Divider />

			<section className="flex flex-wrap my-2">
				{instance.getAllColumns().map(
					(column) =>
						column.columnDefType === 'data' && (
							<div className="mx-3 my-2 inline-flex items-center" key={column.columnDef.id}>
								<Typography sx={{ width: '4.2rem' }}>{getValueForHeader(column.columnDef.header)}</Typography>
								<TextField
									className="w-13rem"
									size="small"
									value={Reflect.get(value, column.columnDef.id) || ''}
									key={column.id}
									label={getValueForHeader(column.columnDef.header)}
									onChange={(e) => setValue({ ...value, [column.columnDef.id]: e.target.value })}
								/>
							</div>
						)
				)}
			</section>

			<section className="flex justify-end mx-4 mb-4">
				<Button variant="outlined" sx={{ mr: '1rem' }} onClick={() => setValue({})}>{`重置`}</Button>
				<Button variant="contained" disableElevation onClick={onClick}>{`确定`}</Button>
			</section>
		</Dialog>
	)
}

export default AddDialog

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})
