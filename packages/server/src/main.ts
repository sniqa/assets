import { queryServer, ServerConfig } from './koa-server'
import queryRouter from './koa-server/queryRouter'
import { deviceScan } from './manage/network-devices-scanner'

// 请求服务器
queryServer({
	port: ServerConfig.QUERY_SERVER_PORT,
	router: queryRouter,
	callback: () => console.log(`query server run at localhost:${ServerConfig.QUERY_SERVER_PORT}`),
})
