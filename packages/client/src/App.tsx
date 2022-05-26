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

import AnimateOutLet from './routers/AnimateOutlet'

const Network = lazy(() => import('./views/Network'))
const NotFound = lazy(() => import('./views/NotFound'))

// network subpage
const User = lazy(() => import('./views/networkSubpage/User'))

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

					<Route path={RoutePath.HOME} element={<Home />} />

					{/* 网络 */}
					<Route
						path={RoutePath.NETWORK}
						element={
							<SuspenseLoading
								element={<AnimateOutLet inClassName="slide-left" outClassName="slide-right" duration={500} />}
							/>
						}
					>
						<Route index element={<SuspenseLoading element={<Network />} />} />

						<Route path={RoutePath.USER} element={<SuspenseLoading element={<User />} />} />

						<Route path={RoutePath.NET_TYPE} element={<SuspenseLoading element={<Network />} />} />

						<Route path={RoutePath.IP} element={<SuspenseLoading element={<Network />} />} />
					</Route>

					<Route path="*" element={<SuspenseLoading element={<NotFound />} />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
