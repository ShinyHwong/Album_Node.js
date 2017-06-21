const express = require('express');
const Router = express.Router();
const formidable = require('formidable');
const path = require('path');
const album = require('../model/album.js');

//创建相册
Router.post('/create', function (req, res) {
    //配置 formidable
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields) {
        //获取post过来的参数
        const albumObj = {name : fields.albumname};
        //在数据库中存储数据
        album.create(albumObj).then(function (doc) {
            if (doc){
                return res.send('创建成功');
            } else {
                return res.send('创建失败');
            }
        });
    });
});

//上传图片
Router.post('/upload', function (req, res) {
    //配置 formidable
    const form = new formidable.IncomingForm();
    form.keepExtensions = true; //保留扩展名
    form.uploadDir = '../Album/upload'; //上传路径
    form.encoding = 'utf-8'; //编码格式
    
    form.parse(req, function (err, fields, files) {
        //获取图片名
        const photoName = path.basename(files.file.path);
        //找到对应的相册并添加图片数据
        album.findOne({name : fields.albumname}).then(function (doc) {
            if (doc){
                doc.photos.push(photoName); //将图片名添加到数据库中
                //保存数据
                doc.save(function (err) {
                    if (!err){
                        res.send('添加成功');
                    } else{
                        res.send('添加失败');
                    }
                });

            } else{
                res.send('相册不存在');
            }
        });
    });
});

//删除图片
Router.get('/delete', function (req, res) {
    const photoName = path.basename(req.query.photoUrl);
    const albumName = path.basename(req.headers.referer);
    album.findOne({name:albumName}).then(function (doc) {
        for(let i = 0; i < doc.photos.length; i++){
            if (doc.photos[i] == photoName){
                doc.photos.splice(i, 1);
                doc.save(function (err, result) {
                    if(!err){
                        res.send('删除成功');
                    }
                });
            }
        }
    }).catch(function (e) {
        res.send('删除失败')
    });
});

//相册内路由
Router.use('/:name',function (req, res) {
    album.findOne({name : req.params.name}).then(function (doc) {
        if (doc.photos){
            res.render('photos.njk', {photoArr : doc.photos});
        }else{
            res.end();
        }
    }).catch(function (e) {
       res.end();
    });
});

exports = module.exports = Router;
