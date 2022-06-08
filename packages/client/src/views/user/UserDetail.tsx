import { Button, IconButton, Input, InputBase, TextField, TextFieldProps, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import React, { useRef, MouseEvent, ReactNode, useState } from 'react'
import { UserInfoWitId } from '@assets/types'

interface UserDetailProps {
	title: string
	userInfo: UserInfoWitId
}

const UserDetail = (props: UserDetailProps) => {
	const { title, userInfo = {} } = props

	const [userInfomation, setUserInfomation] = useState<UserInfoWitId>(userInfo)

	const closeBtnRef = useRef<SVGSVGElement | null>(null)

	return (
		<div onClick={(e) => !closeBtnRef.current?.contains(e.target as Node) && e.stopPropagation()}>
			<section className="flex justify-between p-2">
				<Typography>{title}</Typography>

				<IconButton>
					<CloseIcon ref={closeBtnRef} />
				</IconButton>
			</section>

			<section className="flex flex-wrap items-center p-4">
				<CuzomInput label={`用户名称`} size="small" />
				<CuzomInput label={`用户名称`} size="small" />
				<CuzomInput label={`用户名称`} size="small" />
				<CuzomInput label={`用户名称`} size="small" />
				<CuzomInput label={`用户名称`} size="small" last />
			</section>

			<section className="flex justify-end items-center p-2">
				<Button variant="outlined" sx={{ mr: '1rem' }}>{`重置`}</Button>
				<Button variant="contained" disableElevation>{`确定`}</Button>
			</section>
		</div>
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
