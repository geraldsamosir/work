var express = require('express');
var router = express.Router();
var ctrl_post = require('../controller/post');


//midleware path
var user_mid =  require('../midleware/user');

router.get('/:key/:id',user_mid.login , ctrl_post.detail);

router.get('/filteruser/:key/:target_id',user_mid.login,ctrl_post.user);

router.post('/',user_mid.login,ctrl_post.new);






module.exports = router;