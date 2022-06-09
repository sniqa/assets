import {
	Button,
	Dialog,
	IconButton,
	Input,
	InputBase,
	Slide,
	TextField,
	TextFieldProps,
	Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useRef, MouseEvent, ReactNode, useState, forwardRef } from 'react'
import { UserInfoWitId } from '@assets/types'
import { TransitionProps } from '@mui/material/transitions'

interface UserDetailProps {
	title: string
	userInfo?: UserInfoWitId
	open?: boolean
	close?: () => void
	onClick?: (userInfo: UserInfoWitId) => void
}

const UserDetail = (props: UserDetailProps) => {
	const { title, userInfo = {}, open = true, close = () => {}, onClick = () => {} } = props

	const [userInfomation, setUserInfomation] = useState<UserInfoWitId>(userInfo)

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
					label={`用户名称`}
					size="small"
					value={userInfomation.username || ''}
					onChange={(e) => setUserInfomation({ ...userInfomation, username: e.target.value })}
				/>
				<CuzomInput
					label={`昵称`}
					size="small"
					value={userInfomation.nickname || ''}
					onChange={(e) => setUserInfomation({ ...userInfomation, nickname: e.target.value })}
				/>
				<CuzomInput
					label={`工号`}
					size="small"
					value={userInfomation.number || ''}
					onChange={(e) => setUserInfomation({ ...userInfomation, number: parseInt(e.target.value) })}
				/>
				<CuzomInput
					label={`部门`}
					size="small"
					value={userInfomation.department || ''}
					onChange={(e) => setUserInfomation({ ...userInfomation, department: e.target.value })}
					last
				/>
				{/* <CuzomInput label={`用户名称`} size="small" /> */}
				{/* <CuzomInput label={`用户名称`} size="small" last /> */}
			</section>

			<section className="flex justify-end items-center p-2">
				<Button variant="outlined" sx={{ mr: '1rem' }} onClick={() => setUserInfomation({})}>{`重置`}</Button>
				<Button variant="contained" disableElevation onClick={() => onClick(userInfomation)}>{`确定`}</Button>
			</section>
		</Dialog>
	)
}

export default UserDetail

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
