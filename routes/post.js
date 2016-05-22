var express = require('express');
var router = express.Router();
var ctrl_post = require('../controller/post');


//midleware path
var user_mid =  require('../midleware/user');

router.post('/',user_mid.login,ctrl_post.new);

router.get('/:username/:password/:id',user_mid.login , ctrl_post.detail);

router.get('/filteruser/:username/:password/:target_id',user_mid.login,ctrl_post.user);





module.exports = router;