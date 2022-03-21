const Koa  = require('koa');
const KoaBody = require('koa-body');
const mainRouter = require('../router/main.route');
const userRouter = require('../router/user.route');

const app = new Koa();

app.use(KoaBody({
    multipart: true
}));

app.use(mainRouter.routes())
    .use(userRouter.routes());

module.exports = app;