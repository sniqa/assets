import NavigataItem from '../comps/nav/NavigataItem'
import PersonIcon from '@mui/icons-material/Person'
import { RoutePath } from '../routers'
import AnimateWraper from '../comps/animate/AnimateWraper'

const items = [
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查`, to: RoutePath.USER },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
	{ leftIcon: <PersonIcon />, title: '用户', detail: `用户的增删改查` },
]

const Network = () => {
	return (
		<AnimateWraper>
			{items.map((item, index) => (
				<NavigataItem {...item} key={index} />
			))}
		</AnimateWraper>
	)
}

export default Network
