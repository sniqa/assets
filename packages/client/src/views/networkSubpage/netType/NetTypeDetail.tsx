import { Button, Dialog, IconButton, Slide, TextField, TextFieldProps, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { forwardRef, useState } from 'react'
import { NetTypeInfoWithId } from '@assets/types'
import { TransitionProps } from '@mui/material/transitions'

interface NetTypeDetailProps {
	title: string
	netTypeInfo?: NetTypeInfoWithId
	open?: boolean
	close?: () => void
	onClick?: (netTypeInfo: NetTypeInfoWithId) => void
}

const NetTypesDetail = (props: NetTypeDetailProps) => {
	const { title, netTypeInfo = {}, open = true, close = () => {}, onClick = () => {} } = props

	const [netTypeInformation, setNetTypeInformation] = useState<NetTypeInfoWithId>(netTypeInfo)

	return (
		<Dialog TransitionComponent={Transition} keepMounted open={open} fullWidth>
			<section className="flex justify-between p-2">
				<Typography sx={{ fontSize: '1.6rem' }} className={`p-2 pl-4 text-blue-500`}>
					{title}
				</Typography>

				<div className="">
					<IconButton onClick={() => close()}>
						<CloseIcon />
					</IconButton>
				</div>
			</section>

			<section className="flex flex-wrap items-center p-4">
				<CuzomInput
					label={`类型名称`}
					size="small"
					value={netTypeInformation.typeName || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, typeName: e.target.value })}
				/>
				<CuzomInput
					label={`开始地址`}
					size="small"
					value={netTypeInformation.ipStart || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, ipStart: e.target.value })}
				/>
				<CuzomInput
					label={`结束地址`}
					size="small"
					value={netTypeInformation.ipEnd || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, ipEnd: e.target.value })}
				/>
				<CuzomInput
					label={`子网掩码`}
					size="small"
					value={netTypeInformation.netmask || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, netmask: e.target.value })}
				/>
				<CuzomInput
					label={`网关`}
					size="small"
					value={netTypeInformation.gateway || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, gateway: e.target.value })}
				/>
				<CuzomInput
					label={`dns`}
					size="small"
					value={netTypeInformation.dns || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, dns: e.target.value.split(',') })}
				/>
				<CuzomInput
					label={`描述`}
					size="small"
					value={netTypeInformation.desc || ''}
					onChange={(e) => setNetTypeInformation({ ...netTypeInformation, desc: e.target.value })}
					last
				/>
			</section>

			<section className="flex justify-end items-center p-2">
				<Button variant="outlined" sx={{ mr: '1rem' }} onClick={() => setNetTypeInformation({})}>{`重置`}</Button>
				<Button variant="contained" disableElevation onClick={() => onClick(netTypeInformation)}>{`确定`}</Button>
			</section>
		</Dialog>
	)
}

export default NetTypesDetail

interface LastItem {
	last?: boolean
}

const CuzomInput = (props: TextFieldProps & LastItem) => {
	const { last = false, ...res } = props
	return (
		<div className={`basis-1/2 flex justify-center ${last ? '' : 'mb-4'}`}>
			<TextField {...res} />
		</div>
	)
}

const Transition = forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>
	},
	ref: React.Ref<unknown>
) {
	return <Slide direction="up" ref={ref} {...props} />
})
