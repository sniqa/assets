import { TextField, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { _fetch } from '../../apis/fetch'
import { notice } from '../../apis/mitt'
import AnimateWraper from '../../comps/animate/AnimateWraper'
import LinearProgress from '@mui/material/LinearProgress'

interface IpScanInfo {
	ipStart: string
	ipEnd?: string
}

interface DeviceOnlineStatus {
	host: string
	alive: boolean
}

const SCAN_PENDING = 0
const SCAN_START = 1
const SCAN_FINISH = 2

const IpScanner = () => {
	const [scanInfo, setScanInfo] = useState<IpScanInfo>({
		ipStart: '',
		ipEnd: '',
	})

	const [curOnlineDevice, setCurOnlineDevice] = useState<DeviceOnlineStatus[]>([])

	const [curScanStatus, setCurScanStatus] = useState(SCAN_PENDING)

	const onClick = async () => {
		if (!scanInfo.ipStart) {
			return notice({
				status: 'error',
				message: '开始地址不能为空',
			})
		}

		setCurScanStatus(SCAN_START)

		const { ipScanner } = await _fetch({ ipScanner: scanInfo })

		setCurScanStatus(SCAN_FINISH)

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

		console.log(ipScanner)

		setCurOnlineDevice(ipScanner.data)
	}

	return (
		<AnimateWraper className="bg-light-50 w-full h-full">
			<section className="flex justify-center my-4">
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
				<div className="px-4"></div>
				<Button variant="outlined" onClick={onClick}>{`开始扫描`}</Button>
			</section>

			<section className="px-4 overflow-hidden">
				{(() => {
					switch (curScanStatus) {
						case SCAN_PENDING:
						default:
							return <div className=""></div>
						case SCAN_START:
							return (
								<div className="py-8 flex justify-center flex-col">
									<Typography className={`text-center`} fontSize="2rem">{`正在扫描中,请稍后...`}</Typography>

									<div className="pt-4 w-2/5 text-center w-auto">
										<LinearProgress />
									</div>
								</div>
							)
						case SCAN_FINISH:
							return (
								<div className="h-4/5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-light-50">
									{curOnlineDevice.length > 0 ? (
										curOnlineDevice.map((device) => (
											<DeviceOnline key={device.host} host={device.host} alive={device.alive} />
										))
									) : (
										<Typography>{`当前没有在线的设备`}</Typography>
									)}
								</div>
							)
					}
				})()}
			</section>
		</AnimateWraper>
	)
}

export default IpScanner

interface DeviceOnlineProps {
	host: string
	alive: boolean
}
const DeviceOnline = ({ host, alive }: DeviceOnlineProps) => {
	const state = alive ? { color: 'primary', text: '在线' } : { color: 'disable', text: '离线' }

	return (
		<div className="flex justify-between items-center border-bottom h-2rem px-2">
			<Typography color={state.color}>{host}</Typography>
			<Typography color={state.color}>{state.text}</Typography>
		</div>
	)
}
