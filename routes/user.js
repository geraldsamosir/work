var express = require('express');
var router = express.Router();
var ctrl_index = require('../controller/index');
var ctrl_user = require('../controller/user');

//midleware
var user_mid =  require('../midleware/user');


// user profil and single blog
router.get('/:username', ctrl_user.profil);

//routing cari user dengan menunakan namanya   pada konteks ini adalah cari 
//apabila cari = __alldata___ maka akan di ambil data semua user yang ada
//dan di cek status pertemannya dengan si user yang login 

router.get('/cari/:key/:cari', user_mid.login , ctrl_user.search);

//routing untuk melakukan add user yang lain
router.get('/add/:key/:target',user_mid.login,ctrl_user.addfriend);

//routing untuk melakukan konfirmasi user yang lain
router.get('/confirm/:key/:target',user_mid.login,ctrl_user.confirm);

//routing ini untuk mendapatkan semua data user lain kecuali password nya 
//dan juga temannya dia semua di kaitan dengan hubungan orang ke tiga antara
//user yang login dengan teman si user tersebut
router.get('/detail/:key/:target',user_mid.login ,ctrl_user.friend_detail);

//mengambil semua configurasi profil user yang sedang login
router.get('/config/:key',user_mid.login,ctrl_user.allconfig);

//hapus semua relasi baik pertemanan dan batalkan request
router.delete('/delete/:key/:target',user_mid.login,ctrl_user.deletefriend);

//update informasi configutasi profil user yang sedang login
//yang diperlukan : username, password, email, fotoprofil (kalau tidak ada, buat null)
//fotokronologi (kalau tidak ada, buat null).
router.post('/update/',user_mid.login,ctrl_user.update);





module.exports = router;