const {Sequelize} = require('sequelize');

const { 
    DATABASE_TYPE , 
    DATABASE_HOST, 
    DATABASE_TABLE,
    DATABASE_USER, 
    DATABASE_PASSWORD
}  = require('../config/config.default');


const seq = new Sequelize(DATABASE_TABLE, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: DATABASE_TYPE
});

console.log(DATABASE_TYPE);

seq.authenticate().then( () => {
    console.log('数据库连接成功')
}).catch(err => {
    console.log(err)
})

module.exports = seq;