import NavigataItem from '../comps/nav/NavigataItem'
import PersonIcon from '@mui/icons-material/Person'
import { RoutePath } from '../routers'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

const items = [
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查`, to: RoutePath.USER },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
]

const Network = () => {
	const location = useLocation()

	return (
		<div>
			{items.map((item, index) => (
				<NavigataItem {...item} key={index} />
			))}
		</div>
	)
}

export default Network
