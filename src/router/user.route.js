const Router = require('koa-router');

const {register, login, logout} = require('../controller/user.controller');

/**
 * 用户路由
 */
const router = new Router({prefix: '/user'});

//注册
router.post('/register', register);

//登录
router.post('/login', login);

//登出
router.post('/logout', logout);
  

module.exports = router;