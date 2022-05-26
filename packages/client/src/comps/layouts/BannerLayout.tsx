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
			<div className="flex-grow flex">{main}</div>
		</Fragment>
	)
}

export default BannerLayout
