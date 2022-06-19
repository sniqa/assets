import { Typography, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice } from '../../apis/mitt'
import { ScanIpAddrs, ScanPorts } from '@assets/types'
import AnimateWraper from '../../comps/animate/AnimateWraper'

const PortScanner = () => {
	const [curScanIp, setCurScanIp] = useState<ScanIpAddrs>({})

	const [curScanPort, setCurScanPort] = useState<ScanPorts>({})

	const portScan = async () => {
		if (Object.keys(curScanPort).length === 0 || Object.keys(curScanPort).length === 0) {
			return notice({
				status: 'error',
				message: '地址和端口必填',
			})
		}

		const { portScanner } = await _fetch({
			portScanner: {
				ipAddrs: curScanIp,
				ports: curScanPort,
			},
		})

		console.log(portScanner)

		// if (portScanner.success) {
		// 	console.log(portScanner)
		// }
	}

	return (
		<AnimateWraper className="bg-light-50 flex-grow">
			<section className="h-4rem flex items-center justify-center">
				<Typography fontSize={`1.8rem`}>{`端口扫描`}</Typography>
			</section>

			<section className="w-full flex items-center justify-center">
				<div className="inline-flex flex-col mr-2">
					<div className="mb-2 h-3rem flex items-center">
						<TextField
							size="small"
							label="多个地址用 , 隔开"
							className="w-18rem"
							onChange={(e) => setCurScanIp({ ...curScanIp, addrs: e.target.value })}
						></TextField>
						<span className="px-4 py-2 inline-flex h-3rem items-center">{`或`}</span>
						<TextField
							size="small"
							label="开始地址(包含)"
							className="w-12rem"
							onChange={(e) => setCurScanIp({ ...curScanIp, addrStart: e.target.value })}
						></TextField>
						<span className="px-4">{`~`}</span>
						<TextField
							size="small"
							label="结束地址(不包含)"
							className="w-12rem"
							onChange={(e) => setCurScanIp({ ...curScanIp, addrEnd: e.target.value })}
						></TextField>
					</div>

					<div className="h-3rem flex items-center">
						<TextField
							size="small"
							label="多个端口用 , 隔开"
							className="w-18rem"
							onChange={(e) => setCurScanPort({ ...curScanPort, ports: e.target.value })}
						></TextField>
						<span className="px-4 py-2 inline-flex h-3rem items-center">{`或`}</span>
						<TextField
							size="small"
							label="开始端口(包含)"
							className="w-12rem"
							onChange={(e) => setCurScanPort({ ...curScanPort, portStart: parseInt(e.target.value) })}
						></TextField>
						<span className="px-4">{`~`}</span>
						<TextField
							size="small"
							label="结束端口(不包含)"
							className="w-12rem"
							onChange={(e) => setCurScanPort({ ...curScanPort, portEnd: parseInt(e.target.value) })}
						></TextField>
					</div>
				</div>

				<Button variant="outlined" onClick={portScan}>{`开始扫描`}</Button>
			</section>

			<section></section>
		</AnimateWraper>
	)
}

export default PortScanner
