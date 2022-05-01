 const { findUserByName } = require('../service/user.service');

class UserController{

    async register(ctx, next){
        // const {user_name, password} = ctx.request.body;
        console.log(ctx.request.body)
        ctx.body = ctx.request.body;
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
}

module.exports = new UserController(); 