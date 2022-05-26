interface LeftNavLayoutProps {
	nav: JSX.Element
	content: JSX.Element
}

const LeftNavLayout = ({ nav, content }: LeftNavLayoutProps) => {
	return (
		<div className="flex-grow flex">
			{nav}
			<div className="flex-grow ml-2.5rem">{content}</div>
		</div>
	)
}

export default LeftNavLayout
