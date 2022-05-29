import React from 'react'
import NavigataItem from '../comps/nav/NavigataItem'
import AnimateWraper from '../comps/animate/AnimateWraper'

export const Home = () => {
	return (
		<AnimateWraper className="flex-grow">
			<NavigataItem title={'hello'} detail={`sgsg`} value={`sgs`} />

			<NavigataItem title={'hello'} detail={`sgsg`} value={`sgs`} />
		</AnimateWraper>
	)
}
