var modeluser = require('../model/user');

var CryptoJS = require("crypto-js");


var super_user ={};

super_user.is_admin = function(req,res,next){
	var user_detail ={};
	var user = {
		username : req.body.username || req.params.username,
    	password : req.body.password || req.params.password	
	};
	modeluser.detail(user).then(function(rows){
		user_detail = rows[0];	
	})
	.then(function(rows){
		if(user_detail.status_id == 1){
			next();
		}
		else{
			res.status(200);
		    res.json('false');
		}
	});
};

module.exports = super_user;