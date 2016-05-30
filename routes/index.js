var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');

//midleware path
var user_mid =  require('../midleware/user');


//routing untuk ambil index awal 
router.get('/',ctrl_index.home);

//routing login  diminta username and password pada body
router.post('/login', user_mid.login , ctrl_user.login);

//routing untuk register dimana username,password dan email pada body
router.post('/register',user_mid.register, ctrl_user.register );


module.exports = router;