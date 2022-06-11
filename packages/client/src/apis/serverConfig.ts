
export const httpConfig = {
    hostname: 'localhost',
    port: 19800,
    path: '/phl'
}

export const staticConfig = {
    hostname: 'localhost',
    port: 19802,
    path: '/static'
}

export const wsConfig = {
    hostname: 'localhost',
    port: 19801,
    path: '/ws'
}

export const staticPath = `http://${staticConfig.hostname}:${staticConfig.port}:${staticConfig.path}`

// 硬件收集工具
export const deviceInfoToolName = '硬件设备信息收集工具x86.exe'