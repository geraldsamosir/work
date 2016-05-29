var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');

//midleware
var user_mid =  require('../midleware/user');


// user profil and single blog
router.get('/:username', ctrl_user.profil);

router.get('/cari/:key/:cari', user_mid.login , ctrl_user.search);

router.get('/pertemanan/:key/',user_mid.login,ctrl_user.search);

router.get('/add/:key/:target',user_mid.login,ctrl_user.addfriend);

router.get('/confirm/:key/:target',user_mid.login,ctrl_user.confirm);

router.get('/friend/:key/:target',user_mid.login ,ctrl_user.friend_detail);

router.get('/config/:key',user_mid.login,ctrl_user.allconfig);

router.delete('/delete/:key/:target',user_mid.login,ctrl_user.deletefriend);


router.post('/update/',user_mid.login,ctrl_user.update);





module.exports = router;
