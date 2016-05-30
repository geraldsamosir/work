var express = require('express');
var router = express.Router();
var ctrl_post = require('../controller/post');


//midleware path
var user_mid =  require('../midleware/user');

//routing get untuk ambil single post secara detail
router.get('/:key/:id',user_mid.login , ctrl_post.detail);

//routing untuk filter semua post berdasarkan user yang post
router.get('/filteruser/:key/:target_id',user_mid.login,ctrl_post.user);

//routing untuk ambil semua kategori yang ada 
router.get('/:key/kategori/all' , user_mid.login,ctrl_post.allkategori);


//routing untuk post artikel (diminta untuk post key,title,body, kategori_id,gambar ) dalam body
router.post('/',user_mid.login,ctrl_post.new);



module.exports = router;