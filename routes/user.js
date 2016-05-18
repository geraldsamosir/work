var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');
var user_mid =  require('../midleware/user');


// user profil and single blog
router.get('/:username', ctrl_user.profil);

router.get('/cari/:username/:password/:cari', user_mid.login , ctrl_user.search);


module.exports = router;
