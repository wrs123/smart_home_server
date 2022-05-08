const Koa  = require('koa');
const KoaBody = require('koa-body');
const mainRouter = require('../router/main.route');
const userRouter = require('../router/user.route');
const passport = require('koa-passport');
const session = require('koa-session')
const BaseResult = require('../models/baseResult.model');

const app = new Koa();
app.keys = ['ofg']
const conf = {
//   encode: json => JSON.stringify(json),
//   decode: str => JSON.parse(str),
    key: 'koa.sess', /** 默认 */
    maxAge: 1500000000,// 过期时间
    overwrite: true, /** 可以重写吗 */
    httpOnly: true, /** 仅仅是服务器端能访问 */
    rolling: false, /** 每次访问都更新session */
    renew: true, /**  默认 session 快要过期的时候 重新设置*/
}



//定义允许直接访问的url
const allowpage = ['/user/login']


//拦截
async function localFilter (ctx, next){
    let url = ctx.originalUrl.split('?')[0]
    console.log(url)
    if (allowpage.indexOf(url) > -1) {
        console.log('zhijie')
        await next();
    }else {
        const userName = ctx.session.name
        console.log(ctx.session.name)
        if(!userName){
            ctx.body = new BaseResult({message: '未登录'})
        }else{
            await next();
        }

        // await next();
        
    }
}


app.use(session(conf, app));
//session拦截
app.use(async (ctx, next) => {
    await localFilter(ctx, next)
    // await next();
})

app.use(KoaBody({
    multipart: true
}));

app.use(mainRouter.routes())
    .use(userRouter.routes());


module.exports = app;