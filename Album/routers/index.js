
const signin = require('./signin.js');
const signup = require('./signup.js');
const admin = require('./admin.js');
const album = require('./album.js');
const albumDB = require('../model/album.js');


exports = module.exports = function (app) {
    //监听首页路由
    app.get('/',function (req, res, next) {
        if (!req.session.user) {
            //如果没有登录跳转到登录界面
            return res.redirect('/signin');
        }
        next();
    }, function (req, res) {
        //将相册渲染到首页
        albumDB.find().then(function (doc) {
            res.render('index.njk', {albumArr : doc}); //渲染模板引擎
        })

    });
    //监听登录界面
    app.use('/signin', signin);
    //监听注册界面
    app.use('/signup', signup);
    //监听管理员界面
    app.use('/admin', admin);
    //监听相册界面
    app.use('/album', function (req, res, next) {
        if (!req.session.user){
            //如果没有登录跳转到提示界面
            return res.redirect('/notSignin');
        }
        next();
    } ,album);
    //监听注销请求
    app.get('/signout', function (req, res) {
        req.session.user = null; //清空session
        res.send('注销成功');
    });
    //监听未登录提示路由
    app.get('/notSignin', function (req, res) {
        res.render('notSignin.njk');
    });
};
