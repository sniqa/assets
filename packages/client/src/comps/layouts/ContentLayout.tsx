import { Breadcrumbs, Typography, Button } from '@mui/material'
import { Outlet, Link, useLocation } from 'react-router-dom'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const arrayFind = (target: string, source: Array<string>) => {
	let temp = ''

	const len = source.length

	for (let i = 0; i <= len; i++) {
		const str = source[i]

		temp += `/${str}`

		if (str === target) {
			break
		}
	}

	return temp
}

const ContentLayout = () => {
	const { pathname, key } = useLocation()

	const pathArray = pathname.split('/')

	pathArray.shift()

	return (
		<main className={`flex-grow flex flex-col`}>
			<section className="h-4rem flex items-center">
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
					{pathArray.map((path, index) =>
						index < pathArray.length - 1 ? (
							<Link to={arrayFind(path, pathArray)} key={key} className={`text-blue-600`}>
								{path}
							</Link>
						) : (
							<Typography className={`text-gray-400`} key={key}>
								{path}
							</Typography>
						)
					)}
				</Breadcrumbs>
			</section>

			<section className="flex-grow flex  overflow-hidden reletive">
				<Outlet />
			</section>
		</main>
	)
}

export default ContentLayout
