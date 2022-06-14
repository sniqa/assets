import React, { Fragment } from 'react'

interface BannerLayoutProps {
	header: JSX.Element
	main: JSX.Element
	notice?: JSX.Element
}

const BannerLayout = ({ header, main, notice }: BannerLayoutProps) => {
	return (
		<Fragment>
			{notice}
			{header}
			<div
				className={`flex-grow flex overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-light-50 h-32`}
			>
				{main}
			</div>
		</Fragment>
	)
}

export default BannerLayout
