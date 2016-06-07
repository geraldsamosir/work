var express = require('express');
var router = express.Router();
var ctrl_index = require('../../controller/index');
var ctrl_user = require('../../controller/user');
var ctrl_super = require('../../controller/admin/super_user');

//midleware
var user_mid =  require('../../midleware/user');
var super_mid = require('../../midleware/super_user');


//post to admin page (silahkan post key yang sudah login)
router.post('/',user_mid.login ,super_mid.is_admin , ctrl_super.admin_page);


module.exports = router;