const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const config = require('config-lite')(__dirname);
//连接数据库
const db = mongoose.createConnection(config.dbUrl);

exports = module.exports = db;
