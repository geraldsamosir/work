var express = require('express');
var router = express.Router();
var ctrl_index = require('../../controller/index');
var ctrl_user = require('../../controller/user');
var ctrl_super = require('../../controller/admin/super_user');

//midleware
var user_mid =  require('../../midleware/user');
var super_mid = require('../../midleware/super_user');


//get to admin page
router.get('/', ctrl_super.admin_page);

//update status user minta key,id ,status_ud yang  update 
router.post('/userstat/update',user_mid.login, super_mid.is_admin, ctrl_super.change_user);

//ambil semua user
router.get('/user/:key/:cari', user_mid.login,super_mid.is_admin,ctrl_super.admin_get_users);


//ambil data kategori
router.get('/kategori/:key/all',user_mid.login,super_mid.is_admin,ctrl_super.admin_get_kategori);


//add kategori saat post yang diminta key dan nama (nama ada variable untuk kategori)
router.post('/kategori/add',user_mid.login,super_mid.is_admin,ctrl_super.add_kategori);


//update kategori minta key,id ,nama yang  update 
router.post('/kategori/update',user_mid.login,super_mid.is_admin,ctrl_super.update_kategori);


module.exports = router;