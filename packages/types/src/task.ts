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
	portStart?: string
	portEnd?: string
	ports?: string
}

export interface PortScanner {
	ipAddrs: ScanIpAddrs
	ports: ScanPorts
}
