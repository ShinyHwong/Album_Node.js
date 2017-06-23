个人相册
----------
本项目通过使用 Node.js + yarn + express + nunjucks + MongoDB 搭建的运行在服务端的个人相册。

使用到的中间件有：
- [nunjucks](https://www.npmjs.com/package/nunjucks "nunjucks")
- [mongoose](https://www.npmjs.com/package/mongoose "mongoose")
- [express-session](https://www.npmjs.com/package/express-session "express-session")
- [cookie-parser](https://www.npmjs.com/package/cookie-parser "cookie-parser")
- [connect-mongo](https://www.npmjs.com/package/connect-mongo "connect-mongo")
- [formidable](https://www.npmjs.com/package/formidable "formidable")
- [md5](https://www.npmjs.com/package/md5 "md5")
- [config-lite](https://www.npmjs.com/package/config-lite "config-lite")

## 实现功能
使用 `express` 实现路由功能。包含首页、注册界面、登录界面、用户管理界面、未登录提示界面以及相册内容界面。

使用 `express-session` 、 `cookie-parser` 、`mongoose`、`md5` 实现登录用户管理，并对密码进行加密处理，登录后用户状态存储在 session 中。

使用 `mongoose`、`formidable`对上传的相册目录及图片进行服务器端存储。

使用 `nunjucks` 模板引擎开发界面，提升复用性。

使用 `config-lite` 提升开发便利性，提升可维护性。