import SuspenseRoute from './SuspenseRoute'

export enum RoutePath {
	ROOT = '/',

	HOME = 'home',
	ROOT_HOME = '/home',

	ABOUT = 'about',
	ROOT_ABOUT = '/about',

	DOCUMENT = 'document',
	ROOT_DOCUMENT = '/document',

	NETWORK = 'network',
	ROOT_NETWORK = '/network',

	EDITOR = 'editor',
	ROOT_EDITOR = '/editor',

	USER = 'user',
	ROOT_USER = '/user',

	NET_TYPE = 'nettype',
	ROOT_NET_TYPE = '/nettype',

	IP_RANGE = 'iprange',
	ROOT_IP_RANGE = '/iprange',

	IP_TYPE = 'iptype',
	ROOT_IP_TYPE = 'iptype',

	IP_SCANNER = 'ipscanner',
	ROOT_IP_SCANNER = '/ipscanner',

	IP_MONITOR = 'ipmonitor',
	ROOT_IP_MONITOR = '/ipmonitor',

	IP_OVERVIEW = 'ipoverview',
	ROOT_IP_OVERVIEW = '/ipoverview',

	IP_STRUCT = 'ipstruct',
	ROOT_IP_STRUCT = '/ipstruct',

	PORT_SCAN = 'portscan',
	ROOT_PORT_SCAN = '/portscan',

	PLAN = 'plan',
	ROOT_PLAN = '/plan',

	ECHARTS = 'echarts',
	ROOT_ECHARTS = '/echarts',

	MESSAGE = 'message',
	ROOT_MESSAGE = '/message',

	SETTINGS = 'settings',
	ROOT_SETTINGS = '/settings',

	DEVICES = 'devices',
	ROOT_DEVICES = '/devices',
}

export { SuspenseRoute }
