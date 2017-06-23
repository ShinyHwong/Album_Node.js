const mongoose = require('mongoose');
const db = require('./db.js');

//生成 Schema
const albumSchema = new mongoose.Schema({
    name : { //相册名
        type : String,
        required : true,
        unique : true
    },
    photos : [] //用来存储相册内的照片
});

//创建 Model
const albumModel = db.model('album', albumSchema);

exports = module.exports = {
    //创建相册
    create : function (obj) {
        return albumModel.create(obj);
    },
    //查找相册
    find : function (obj) {
        return albumModel.find(obj);
    },
    //查找一个
    findOne : function (obj) {
        return albumModel.findOne(obj);
    }
};