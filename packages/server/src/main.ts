import { queryServer, ServerConfig } from './koa-server'
import queryRouter from './koa-server/queryRouter'
import { deviceScan } from './manage/network-scanner'
import { wsServer } from './wsServer/wsServer'

// // 请求服务器
// queryServer({
// 	port: ServerConfig.QUERY_SERVER_PORT,
// 	router: queryRouter,
// 	callback: () => console.log(`query server run at localhost:${ServerConfig.QUERY_SERVER_PORT}`),
// })

// // WebSocket服务器
// wsServer({ port: 19801 })

deviceScan()