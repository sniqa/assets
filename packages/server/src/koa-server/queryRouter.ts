import { ParameterizedContext } from 'koa'
import Router, { IRouterParamContext } from 'koa-router'
import { ServerConfig } from './serverConfig'
// import { falseRes, REQUIRED_JSON, UNKOWN_ERROR } from '../error'
import { dispatch, regeister } from './jsonRouter'
import { isObject } from '@assets/share'
import * as user from '../controller/users'
import * as device from '../controller/devices'
// import * as netType from '../controller/netType'
// import * as document from '../controller/document'
// import * as ipAddress from '../controller/ipAddress'
// import * as ping from '../controller/ping'

regeister({
	test: () => 'hello',
	...user,
	...device,
})

const queryRouter = new Router()

queryRouter.post(`${ServerConfig.QUERY_SERVER_ROUTE}`, async (ctx) => {
	ctx.response.body = await gateway(ctx).catch((err) => console.log(err))
})

queryRouter.get(`${ServerConfig.QUERY_SERVER_ROUTE}`, (ctx) => (ctx.response.body = 'pong'))

queryRouter.get('/test', (ctx) => (ctx.response.body = 'Hello, this is test of router /test'))

export const gateway = async (ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>) => {
	const { body } = ctx.request

	if (isObject(body)) {
		return await dispatch(body).catch((err) => {
			console.log(err)
			return {}
			// falseRes(UNKOWN_ERROR)
		})
	} else {
		return {}
		// falseRes(REQUIRED_JSON)
	}
}

export default queryRouter
