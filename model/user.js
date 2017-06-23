const mongoose = require('mongoose');
const db = require('./db.js');

//生成 Schema
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
});
//创建 Model
const userModel = db.model('user', userSchema);
//导出方法
exports = module.exports = {
    //添加数据
    create : function (obj) {
        //将方法返回，方便回调
        return userModel.create(obj);
    },
    find : function (obj) {
        return userModel.findOne(obj);
    }
};