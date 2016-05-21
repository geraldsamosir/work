var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');
var user_mid =  require('../midleware/user');


// user profil and single blog
router.get('/:username', ctrl_user.profil);

router.get('/cari/:username/:password/:cari', user_mid.login , ctrl_user.search);

router.get('/add/:username/:password/:target',user_mid.login,ctrl_user.addfriend);

router.get('/confirm/:username/:password/:target',user_mid.login,ctrl_user.confirm);

router.get('/config/:username/:password',user_mid.login,ctrl_user.allconfig);

router.delete('/delete/:username/:password/:target',user_mid.login,ctrl_user.deletefriend);

router.post('/update/',user_mid.login,ctrl_user.update);




module.exports = router;
