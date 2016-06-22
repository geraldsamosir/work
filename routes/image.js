var express = require('express');
var router = express.Router();
var ctrl_image = require('../controller/image');

//midleware path
var upload = require('../midleware/image');

var user_mid =  require('../midleware/user');

router.post('/upload', upload , ctrl_image.name);

router.get('/filter/:key/:id_post',user_mid.login, ctrl_image.fiterby_post);

module.exports = router;