var modeluser = require('../../model/user');
var modelpost = require('../../model/post');
var modelpertemanan = require('../../model/pertemanan');

var CryptoJS = require("crypto-js");

super_user ={};

super_user.admin_page = function(req,res){
	res.status(200);
    res.render('./admin.html', {
   		 title : "ADMIN PAGE"
  	});
};


module.exports = super_user;	