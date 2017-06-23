//导入模块
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('config-lite')(__dirname);
//导入路由模块
const router = require('./routers/index.js');

//设置静态文件路径
app.use(express.static('public'));
app.use(express.static('upload'));

//配置 nunjucks
nunjucks.configure('views',{express:app});

//配置 session
app.use(cookieParser());
app.use(session({
    store : new MongoStore({
        url : config.dbUrl
    }),
    resave : false,
    saveUninitialized : false,
    secret : '123',
    cookie : {
        maxAge : 24 * 3600 * 1000
    }
}));
//通用
app.use(function (req, res, next) {
    //传递模板中的 title （复用）
    app.locals.title = config.title;
    //将缓存数据复用
    res.locals.user = req.session.user;
    next();
});

router(app);


//启动监听
app.listen(config.port);