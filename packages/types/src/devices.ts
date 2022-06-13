import { WithId } from './common'

enum DeviceType {
	desktop = '台式机',
	laptop = '笔记本',
	printer = '打印机',
	server = '服务器',
}

// 系统信息
interface System {
	manufacturer: string
	model: string
	version: string
	serial: string
	uuid: string
	sku: string
	virtual: boolean
}

interface Bios {
	vendor: string
	version: string
	releaseDate: string
	revision: string
	serial: string
}

interface Baseboard {
	manufacturer: string
	model: string
	version: string
	serial: string
	assetTag: string
	memMax: number
	memSlots: number
}

interface Classis {
	manufacturer: string
	model: string
	type: string
	version: string
	serial: string
	assetTag: string
	sku: string
}

interface Os {
	platform: string
	distro: string
	release: string
	codename: string
	kernel: string
	arch: string
	hostname: string
	fqdn: string
	codepage: string
	logofile: string
	serial: string
	build: string
	servicepack: string
	uefi: boolean
	hypervisor: boolean
	remoteSession: boolean
}

interface Uuid {
	os: string
	hardware: string
	macs: string[]
}

interface Versions {
	kernel: string
	openssl: string
	systemOpenssl: string
	systemOpensslLib: string
	node: string
	v8: string
	npm: string
	yarn: string
	pm2: string
	gulp: string
	grunt: string
	git: string
	tsc: string
	mysql: string
	redis: string
	mongodb: string
	apache: string
	nginx: string
	php: string
	docker: string
	postfix: string
	postgresql: string
	perl: string
	python: string
	python3: string
	pip: string
	pip3: string
	java: string
	gcc: string
	virtualbox: string
	bash: string
	zsh: string
	fish: string
	powershell: string
	dotnet: string
}

interface Cpu {
	manufacturer: string
	brand: string
	vendor: string
	family: string
	model: string
	stepping: string
	revision: string
	voltage: string
	speed: number
	speedMin: number
	speedMax: number
	governor: string
	cores: number
	physicalCores: number
	processors: number
	socket: string
	flags: string
	virtualization: boolean
	cache: { l1d: number; l1i: number; l2: number; l3: number }
}

interface Graphics {
	controllers: object[]
	displays: [[object], [object]]
}

interface Net {
	iface: string
	ifaceName: string
	default: boolean
	ip4: string
	ip4subnet: string
	ip6: string
	ip6subnet: string
	mac: string
	internal: boolean
	virtual: boolean
	operstate: string
	type: string
	duplex: string
	mtu: string
	speed: null
	dhcp: boolean
	dnsSuffix: string
	ieee8021xAuth: string
	ieee8021xState: string
	carrierChanges: number
}

interface Memery {
	size: number
	bank: string
	type: string
	ecc: boolean
	clockSpeed: number
	formFactor: string
	manufacturer: string
	partNum: string
	serialNum: string
	voltageConfigured: number
	voltageMin: number
	voltageMax: number
}

interface Disk {
	device: string
	type: string
	name: string
	vendor: string
	size: number
	bytesPerSector: number
	totalCylinders: number
	totalHeads: number
	totalSectors: number
	totalTracks: number
	tracksPerCylinder: number
	sectorsPerTrack: number
	firmwareRevision: string
	serialNum: string
	interfaceType: string
	smartStatus: string
	temperature: null
}

interface Printer {
	id: number
	name: string
	model: string
	uri: string | null
	uuid: string | null
	status: string
	local: boolean
	default: boolean
	shared: boolean
}

export interface UploadDeviceInfo {
	user: string
	department: string
	version: string
	system: System
	bios: Bios
	baseboard: Baseboard
	classis: Classis
	os: Os
	uuid: Uuid
	versions: Versions
	cpu: Cpu
	graphics: Graphics
	net: Net[]
	memery: Memery[]
	disk: Disk[]
	networkGatewayDefault: string
	printer: Printer[]
}

export interface DeviceInfo {
	user?: string
	department?:string
	mem?: object
	osInfo: object
	desc?: string
}

export type DeviceInfoWithId = DeviceInfo & WithId

export type DevicesInfoWithid = Array<DeviceInfoWithId>
