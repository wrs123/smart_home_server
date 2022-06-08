const SysUser = require('../models/user.model');
const BaseResult = require('../models/baseResult.model');
// const { message } = require('koa/lib/response');

class UserService{
    async findUserByName(name, password){
        try{
            const res = new BaseResult({});
            const hasUser = await SysUser.count({
                where: {name}
            })
            if(hasUser == 1){
                const data = await SysUser.findAll({
                    attributes: ['password', 'id'],
                    where: {name}
                })
                const old_password = data[0].dataValues.password;
                const id = data[0].dataValues.id;
                console.log(old_password);
               
                if(old_password === password){
                    res.setCode(200);
                    res.setMessage('登录成功');
                    res.setResult({user_name: name, id});
    
                }else{
                    res.setCode(500);
                    res.setMessage('密码错误');
                }
                
                return res;
            }
            res.setCode(500);
            res.setMessage('用户名不存在');
            return res;

        }catch(err){
            console.log(err);
            return new BaseResult({message: err});
        }
        
    }

    async registerUser(name, password){
        try{
            const res = new BaseResult({});
            const hasUser = await SysUser.count({
                where: {name}
            })

            console.log(hasUser);
            if(hasUser == 0){
                const data = await SysUser.create({
                    name: name,
                    password : password,
                    ctime: Date.now(),
                    etime:  Date.now(),
                    del_sign: 0
                })
                console.log(data.id);
                
                if(data.id){
                    res.setCode(200);
                    res.setMessage('注册成功');
                    res.setResult({user_name: name, id: data.id});
    
                }else{
                    res.setCode(500);
                    res.setMessage('注册失败');
                }
                return res;
            }
            res.setCode(500);
            res.setMessage('用户名重复');
            return res;
            
        }catch(err){
            console.log(err);
            return new BaseResult({message: err});
        }
        
    }
}

module.exports = new UserService();