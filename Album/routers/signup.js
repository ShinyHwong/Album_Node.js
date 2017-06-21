const express = require('express');
const Router = express.Router();
const formidable = require('formidable');
const md5 = require('md5');
const user = require('../model/user.js');



//监听注册界面
Router.get('/', function (req, res) {
    res.render('signup.njk');
});
Router.post('/', function (req, res) {
    //配置 formidable
    const form = new formidable.IncomingForm();
    //获取传过来的参数
    form.parse(req, function (err, fields) {
        const username = fields.username;
        const password = fields.password;
        const retypePWD = fields.retypePWD;
        //账号合法性判断
        try{
            if (password !== retypePWD){
                throw new Error('两次输入的密码不一致');
            } else if(username.length <5 || username.length > 12){
                throw new Error('用户名长度应在5~12位之间');
            }
        } catch (e){
            //返回错误原因
            return res.json(e.message);
        }
        //存储账户信息到数据库
        const account = {
            username : username,
            password : md5(password)
        };
        //调用数据库方法存储
        user.create(account).then(function () {
            res.send('注册成功');
        }).catch(function (e) {
            res.send('注册失败');
        });
    });
});

exports = module.exports = Router;