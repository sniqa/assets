import { IconButton, Typography, Tooltip, Badge } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar'
import ArticleIcon from '@mui/icons-material/Article'
import InfoIcon from '@mui/icons-material/Info'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import PersonIcon from '@mui/icons-material/Person'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows'
import { RoutePath } from '../../routers'
import { Link, useMatch } from 'react-router-dom'
import { useState } from 'react'

interface LeftSidebarItemProps {
	icon?: JSX.Element
	title: string
	to: string
}

const LeftSidebarItem = (props: LeftSidebarItemProps) => {
	const { icon, title, to } = props

	const match = useMatch({ path: to, end: false })

	return (
		<Link
			className={`${
				match ? 'nav-item-selected' : ''
			} nav-item-hover rounded-md flex items-center py-1.5 px-2 my-1 text-dark-500 w-16rem`}
			to={to}
		>
			<Tooltip title={title} placement={`right-start`}>
				<div className="ml-1 mr-3 flex items-center text-sm">{icon}</div>
			</Tooltip>
			<Typography>{title}</Typography>
		</Link>
	)
}

const navs: Array<LeftSidebarItemProps> = [
	{ icon: <HomeIcon />, title: '主页', to: RoutePath.HOME },
	{ icon: <PersonIcon />, title: '用户', to: RoutePath.USER },
	{ icon: <ArticleIcon />, title: '文档', to: RoutePath.DOCUMENT },
	{ icon: <SignalWifi2BarIcon />, title: '网络', to: RoutePath.NETWORK },
	{ icon: <DesktopWindowsIcon />, title: '设备', to: RoutePath.DEVICES },
	{
		icon: (
			<Badge badgeContent={0} color={`primary`}>
				<NotificationsIcon />
			</Badge>
		),
		title: '消息',
		to: RoutePath.MESSAGE,
	},
	{ icon: <InfoIcon />, title: '关于', to: RoutePath.ABOUT },
]

const settings: LeftSidebarItemProps = {
	icon: <SettingsIcon />,
	title: '设置',
	to: RoutePath.SETTINGS,
}

const LeftSidebarNav = () => {
	const [shrink, setShrink] = useState(false)

	return (
		<div className={`${shrink ? 'w-16rem' : 'w-3rem'} overflow-hidden width-translate flex flex-col`}>
			<section className={`flex items-center justify-center`}>
				<IconButton title={`${shrink ? '缩小' : '扩大'}`} onClick={() => setShrink(!shrink)}>
					{shrink ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
				</IconButton>
			</section>

			<section className="flex-grow">
				{navs.map((nav, index) => (
					<LeftSidebarItem key={index} {...nav} />
				))}
			</section>

			<section>
				<LeftSidebarItem {...settings} />
			</section>
		</div>
	)
}

export default LeftSidebarNav
