import { AnimatePresence, motion } from 'framer-motion'

interface AnimateWraperProps {
	children: JSX.Element | Array<JSX.Element> | string
}

const AnimateWraper = ({ children }: AnimateWraperProps) => {
	return (
		<AnimatePresence>
			<motion.div initial={{ x: '10%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}

export default AnimateWraper
