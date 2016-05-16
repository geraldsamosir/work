var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');


// user profil and single blog
router.get('/:username', ctrl_user.profil);



module.exports = router;
