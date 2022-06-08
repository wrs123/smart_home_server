 const { findUserByName, registerUser } = require('../service/user.service');
 const BaseResult = require('../models/baseResult.model');

class UserController{

    async register(ctx, next){
        const {name, password} = ctx.request.body;
        const res = await registerUser(name, password);
        console.log(res);
        ctx.body = res;
    }
   
    async login(ctx, next){
        const {name, password} = ctx.request.body;
        const res = await findUserByName(name, password);
        if(res.code === 200){
            ctx.session.name = name
        }
        // console.log(ctx.session.name);
        ctx.body = res;
    }

    async logout(ctx, next){
      
        const res = new BaseResult({});
        ctx.session = null
        res.setCode(200);
        res.setMessage('登出成功');
        ctx.body = res;
    }
}

module.exports = new UserController(); 