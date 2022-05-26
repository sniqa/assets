import { useEffect, useState } from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

interface AnimateOutLetProps {
	inClassName?: string
	outClassName?: string
	duration?: number
	children?: JSX.Element
}

const AnimateOutLet = (props: AnimateOutLetProps) => {
	const { inClassName, outClassName, duration, children } = props

	const location = useLocation()

	const [classname, setClassName] = useState(inClassName)

	useEffect(() => {
		let timer = setTimeout(() => setClassName(''), duration)

		return () => {
			console.log(location.pathname)

			clearTimeout(timer)

			setClassName(outClassName)

			setTimeout(() => setClassName(''), duration)
		}
	}, [location])

	return (
		<div className={classname}>
			<Outlet />
		</div>
	)
}

export default AnimateOutLet
