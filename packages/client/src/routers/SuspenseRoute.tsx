import { CircularProgress } from '@mui/material'
import { Route } from 'react-router-dom'
import React, { Suspense } from 'react'

interface SuspenseLoading {
	path: string
	element: JSX.Element
}

const SuspenseRoute = ({ path, element }: SuspenseLoading) => {
	return <Route path={path} element={<Suspense fallback={<Loading />}>{element}</Suspense>} />
}

export default SuspenseRoute

const Loading = () => {
	return (
		<div className="h-full flex-grow flex justify-center items-center">
			<CircularProgress />
		</div>
	)
}
