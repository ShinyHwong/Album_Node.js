const express = require('express');
const Router = express.Router();
const formidable = require('formidable');
const md5 = require('md5');
const user = require('../model/user.js');



//监听登录界面
Router.get('/',function (req, res, next) {
    if(req.session.user){ //已经登录不能重复登录
        return res.redirect('/admin');
    }
    next();
} ,function (req, res) {
    res.render('signin.njk');
});
Router.post('/', function (req, res) {
    //配置 formidable
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        const username = fields.username;
        const password = fields.password;
        //查询账户是否存在
        user.find({username : username}).then(function (doc) {
            if (doc){
                if (md5(password) == doc.password){
                    req.session.user = doc; //设置缓存
                    return res.send('登录成功');
                } else {
                    return res.send('密码错误');
                }
            }
            else {
                return res.send('用户不存在');
            }
        }).catch(function (e) {
            res.send('登录失败')
        });
    });
});

exports = module.exports = Router;