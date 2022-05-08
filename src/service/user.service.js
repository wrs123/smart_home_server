const SysUser = require('../models/user.model');
const BaseResult = require('../models/baseResult.model');
// const { message } = require('koa/lib/response');

class UserService{
    async findUserByName(name, password){
        try{
            const data = await SysUser.findAll({
                attributes: ['password', 'id'],
                where: {name}
            })
            const old_password = data[0].dataValues.password;
            const id = data[0].dataValues.id;
            console.log(old_password);
            const res = new BaseResult({});
            if(old_password === password){
                res.setCode(200);
                res.setMessage('登录成功');
                res.setResult({user_name: name, id});

            }else{
                res.setCode(500);
                res.setMessage('密码错误');
            }
            
            return res;
        }catch(err){
            console.log(err);
            return new BaseResult({message: err});
        }
        
    }
}

module.exports = new UserService();