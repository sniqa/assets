export interface IpScanner {
	ipStart: string
	ipEnd?: string
}

export interface ScanIpAddrs {
	addrStart?: string
	addrEnd?: string
	addrs?: string
}

export interface ScanPorts {
	portStart?: number
	portEnd?: number
	ports?: string
}

export interface PortScanner {
	ipAddrs: ScanIpAddrs
	ports: ScanPorts
}
