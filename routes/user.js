var express = require('express');
var router = express.Router();


//user profil and single blog
router.get('/:username', function(req, res) {
        res.render('./user.html', {
        title : req.params.username+" Profile" ,
        name : req.params.username
        });
});
//single post
router.get('/:username/post/:title', function(req, res) {
    res.render('./singlepost.html', {
        title : req.params.title,
        name : req.params.username
        });

});

//user branda
router.get('/:username/beranda',function(req,res){
	res.status(200);
        res.render('beranda.html', {
        title : "BERANDA",
        name : req.params.username
     });

});

//search another user
router.get('/:username/carikawan',function(req,res){
	res.status(200);
        res.render('cari.html', {
        title : "CARI KAWAN",
        name : req.params.username
    });

});
module.exports = router;
