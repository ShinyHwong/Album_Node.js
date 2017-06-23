const express = require('express');
const Router = express.Router();
const formidable = require('formidable');
const album = require('../model/album.js');

Router.get('/',function (req, res, next) {
    if (!req.session.user){
        //如果没有登录跳转到提示界面
        return res.redirect('/notSignin');
    }
    next();
} , function (req, res) {
    //查找数据库中是否已经创建相册
    album.find().then(function (doc) {
        //有就显示在界面中
        res.render('admin.njk', {albumArr : doc});
    })
});

exports = module.exports = Router;