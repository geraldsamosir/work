var express = require('express');
var router = express.Router();


// user profil and single blog
router.get('/:username', function(req, res) {
        res.render('./user.ejs', {
        title : req.params.username+" Profile" ,
        name : req.params.username
        });
});

//single post
router.get('/:username/post/:title', function(req, res) {
    res.render('./singlepost.ejs', {
        title : req.params.title,
        name : req.params.username
        });

})
;
//user branda
router.get('/:username/beranda',function(req,res){
	res.status(200);
        res.render('beranda.ejs', {
        title : "BERANDA",
        name : req.params.username
     });

});

//search another user
router.get('/:username/carikawan',function(req,res){
	res.status(200);
        res.render('cari.ejs', {
        title : "CARI KAWAN",
        name : req.params.username
    });

});

module.exports = router;
