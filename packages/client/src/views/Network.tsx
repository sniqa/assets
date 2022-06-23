import NavigataItem from '../comps/nav/NavigataItem'
import PersonIcon from '@mui/icons-material/Person'
import CommitIcon from '@mui/icons-material/Commit'
import WifiFindIcon from '@mui/icons-material/WifiFind'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import ScreenShareIcon from '@mui/icons-material/ScreenShare'
import HubIcon from '@mui/icons-material/Hub'
import CableIcon from '@mui/icons-material/Cable'
import { RoutePath } from '../routers'
import AnimateWraper from '../comps/animate/AnimateWraper'

const items = [
	{ leftIcon: <ScreenShareIcon />, title: '概况', detail: `网络大屏概况`, to: RoutePath.IP_OVERVIEW },
	{ leftIcon: <CommitIcon />, title: '类型', detail: `IP类型`, to: RoutePath.IP_TYPE },
	{ leftIcon: <CableIcon />, title: 'IP段', detail: `IP地址段的管理`, to: RoutePath.IP_RANGE },
	{ leftIcon: <WifiFindIcon />, title: 'PING扫描器', detail: `对指定的ip范围进行扫描`, to: RoutePath.IP_SCANNER },
	{ leftIcon: <WifiFindIcon />, title: '端口扫描器', detail: `对指定的ip扫描端口`, to: RoutePath.PORT_SCAN },
	{ leftIcon: <MonitorHeartIcon />, title: 'IP监测', detail: `对指定的ip或或网站进行监测`, to: RoutePath.IP_MONITOR },
	{ leftIcon: <HubIcon />, title: '网络结构', detail: `网络结构示意图`, to: RoutePath.IP_STRUCT },
]

const Network = () => {
	return (
		<AnimateWraper className="flex-grow">
			{items.map((item, index) => (
				<NavigataItem {...item} key={index} />
			))}
		</AnimateWraper>
	)
}

export default Network
