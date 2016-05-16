var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');

//midleware path
var user_mid =  require('../midleware/user');


router.get('/',ctrl_index.home);

router.post('/login', user_mid.login , ctrl_user.login);

router.post('/register',user_mid.register, ctrl_user.register );


module.exports = router;
