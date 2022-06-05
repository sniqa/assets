import { HTMLAttributes, useEffect, useRef } from 'react'

const CuzomCheckbox = ({
	indeterminate,
	className = '',
	...rest
}: { indeterminate?: boolean } & HTMLAttributes<HTMLInputElement>) => {
	const ref = useRef<HTMLInputElement>(null!)

	useEffect(() => {
		if (typeof indeterminate === 'boolean') {
			ref.current.indeterminate = indeterminate
		}
	}, [ref, indeterminate])

	return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />
}

export default CuzomCheckbox
