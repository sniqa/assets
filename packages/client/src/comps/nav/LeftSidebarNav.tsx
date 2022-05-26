import { IconButton, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar'
import ArticleIcon from '@mui/icons-material/Article'
import InfoIcon from '@mui/icons-material/Info'
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import { RoutePath } from '../../routers'
import { Link, useMatch } from 'react-router-dom'
import { useState } from 'react'

const navs: Array<NavigateItemProps> = [
	{ icon: <HomeIcon />, title: '主页', to: RoutePath.HOME },
	{ icon: <SignalWifi2BarIcon />, title: '网络', to: RoutePath.NETWORK },
	{ icon: <ArticleIcon />, title: '文档', to: RoutePath.DOCUMENT },
	{ icon: <InfoIcon />, title: '关于', to: RoutePath.ABOUT },
]

const LeftSidebarNav = () => {
	const [shrink, setShrink] = useState(false)

	return (
		<div className={`${shrink ? 'w-16rem' : 'w-3rem'} overflow-hidden width-translate`}>
			<section className={`flex items-center justify-center`}>
				<IconButton title={`${shrink ? '缩小' : '扩大'}`} onClick={() => setShrink(!shrink)}>
					{shrink ? <ZoomInMapIcon /> : <ZoomOutMapIcon />}
				</IconButton>
			</section>

			{navs.map((nav, index) => (
				<NavigateItem key={index} {...nav} />
			))}
		</div>
	)
}

export default LeftSidebarNav

interface NavigateItemProps {
	icon?: JSX.Element
	title: string
	to: string
}

const NavigateItem = (props: NavigateItemProps) => {
	const { icon, title, to } = props

	const match = useMatch({ path: to, end: false })

	return (
		<Link
			className={`${
				match ? 'nav-item-selected' : ''
			} nav-item-hover rounded-md flex items-center py-1.5 px-2 my-1 text-dark-500 w-16rem`}
			to={to}
			title={title}
		>
			<div className="ml-1 mr-3 flex items-center text-sm">{icon}</div>
			<Typography>{title}</Typography>
		</Link>
	)
}
