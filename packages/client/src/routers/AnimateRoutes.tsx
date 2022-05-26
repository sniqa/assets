import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Routes, useLocation } from 'react-router-dom'

interface AnimateRoutesProps {
	children?: JSX.Element
}

const AnimateRoutes = ({ children }: AnimateRoutesProps) => {
	const location = useLocation()

	return (
		<TransitionGroup>
			<CSSTransition classNames={'slide-left'} timeout={2000} key={location.key}>
				<Routes>{children}</Routes>
			</CSSTransition>
		</TransitionGroup>
	)
}

export default AnimateRoutes
