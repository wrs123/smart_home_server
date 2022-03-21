const Router = require('koa-router');

//主路由
const router = new Router({prefix: '/index'});

router.get('/do', ctx => {
    ctx.body = '11111';
  })
  
router.get('/dos', ctx => {
    ctx.body = '1122111';
})

module.exports = router;