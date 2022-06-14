import { TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice } from '../../apis/mitt'
import AnimateWraper from '../../comps/animate/AnimateWraper'

interface IpScanInfo {
	ipStart: string
	ipEnd?: string
}

interface DeviceOnlineStatus {
	host: string
	alive: boolean
}

const IpScanner = () => {
	const [scanInfo, setScanInfo] = useState<IpScanInfo>({
		ipStart: '',
		ipEnd: '',
	})

	const [curOnlineDevice, setCurOnlineDevice] = useState<DeviceOnlineStatus[]>([])

	const onClick = async () => {
		if (!scanInfo.ipStart) {
			return notice({
				status: 'error',
				message: '开始地址不能为空',
			})
		}

		const { ipScanner } = await _fetch({ ipScanner: scanInfo })

		console.log(ipScanner)

		if (!ipScanner.success) {
			return notice({
				status: 'error',
				message: ipScanner.errMsg,
			})
		}

		notice({
			status: 'success',
			message: '扫描完毕',
		})

		setCurOnlineDevice(ipScanner.data)
	}

	return (
		<AnimateWraper className="bg-light-50 w-full">
			<section>
				<Typography color="primary" fontSize={`2rem`} className={`px-4`}>{`扫描ip地址段`}</Typography>
			</section>

			<section className="h-4rem flex items-center justify-center">
				<TextField
					size="small"
					label={`开始地址`}
					onChange={(e) => setScanInfo({ ...scanInfo, ipStart: e.target.value })}
				/>
				<div className="mx-4">~</div>
				<TextField
					size="small"
					label={`结束地址`}
					onChange={(e) => setScanInfo({ ...scanInfo, ipEnd: e.target.value })}
				/>
				<div className="mx-4"></div>
				<Button variant="outlined" onClick={onClick}>{`开始扫描`}</Button>
			</section>

			<section className="px-4">
				{curOnlineDevice.length > 0 &&
					curOnlineDevice.map((device) => <DeviceOnline key={device.host} host={device.host} />)}
			</section>
		</AnimateWraper>
	)
}

export default IpScanner

interface DeviceOnlineProps {
	host: string
}
const DeviceOnline = ({ host }: DeviceOnlineProps) => {
	return (
		<div className="flex justify-between items-center border-bottom h-2rem px-2">
			<Typography color={`primary`}>{host}</Typography>
			<Typography color={`primary`}>{`在线`}</Typography>
		</div>
	)
}
