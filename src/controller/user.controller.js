const { createUser } = require('../model/user.model');

class UserController{

    async register(ctx, next){
        // const {user_name, password} = ctx.request.body;
        console.log(ctx.request.body)
        ctx.body = ctx.request.body;
    }
   
    async login(ctx, next){
        ctx.body = '登录';
    }
}

module.exports = new UserController(); 