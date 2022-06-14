import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import BannerLayout from './comps/layouts/BannerLayout'
import LeftNavLayout from './comps/layouts/LeftNavLayout'
import ContentLayout from './comps/layouts/ContentLayout'
import Header from './comps/nav/Header'
import { RoutePath, SuspenseRoute } from './routers'
import { Home } from './views/Home'
import Noticebar from './comps/notice/Noticebar'
import SuspenseLoading from './routers/SuspenseLoading'
import LeftSideNav from './comps/nav/LeftSidebarNav'

const Network = lazy(() => import('./views/Network'))
const NotFound = lazy(() => import('./views/NotFound'))

const User = lazy(() => import('./views/user/User'))
const Message = lazy(() => import('./views/Message'))
const Devices = lazy(() => import('./views/devices/Devices'))

const IpType = lazy(() => import('./views/networkSubpage/netType/NetType'))
const IpMonitor = lazy(() => import('./views/networkSubpage/IpMonitor'))
const IpOverview = lazy(() => import('./views/networkSubpage/IpOverview'))
const IpRange = lazy(() => import('./views/networkSubpage/IpRange'))
const IpScanner = lazy(() => import('./views/networkSubpage/IpScanner'))
const IpStruct = lazy(() => import('./views/networkSubpage/IpStruct'))

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={RoutePath.ROOT}
					element={
						<BannerLayout
							notice={<Noticebar />}
							header={<Header />}
							main={<LeftNavLayout nav={<LeftSideNav />} content={<ContentLayout />} />}
						/>
					}
				>
					<Route index element={<Navigate to={RoutePath.HOME} replace />} />

					{/* 主页 */}
					<Route path={RoutePath.HOME} element={<Home />} />

					{/* 网络 */}
					<Route path={RoutePath.NETWORK} element={<SuspenseLoading element={<Outlet />} />}>
						<Route index element={<SuspenseLoading element={<Network />} />} />

						<Route path={RoutePath.IP_TYPE} element={<SuspenseLoading element={<IpType />} />} />

						<Route path={RoutePath.IP_OVERVIEW} element={<SuspenseLoading element={<IpOverview />} />} />

						<Route path={RoutePath.IP_RANGE} element={<SuspenseLoading element={<IpRange />} />} />

						<Route path={RoutePath.IP_MONITOR} element={<SuspenseLoading element={<IpMonitor />} />} />

						<Route path={RoutePath.IP_SCANNER} element={<SuspenseLoading element={<IpScanner />} />} />

						<Route path={RoutePath.IP_STRUCT} element={<SuspenseLoading element={<IpStruct />} />} />
					</Route>

					{/* 用户 */}
					<Route path={RoutePath.USER} element={<SuspenseLoading element={<User />} />} />

					{/* 信息 */}
					<Route path={RoutePath.MESSAGE} element={<SuspenseLoading element={<Message />} />} />

					{/* 设备 */}
					<Route path={RoutePath.DEVICES} element={<SuspenseLoading element={<Devices />} />} />
					{/* 表格 */}
					{/* <Route path={`table`} element={<SuspenseLoading element={<Table />} />} />
					<Route path={`table2`} element={<SuspenseLoading element={<Table2 />} />} />
					<Route path={`table3`} element={<SuspenseLoading element={<Table3 />} />} /> */}

					{/* Not Found */}
					<Route path="*" element={<SuspenseLoading element={<NotFound />} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
