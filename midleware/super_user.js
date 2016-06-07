var modeluser = require('../model/user');

var CryptoJS = require("crypto-js");


var super_user ={};

super_user.is_admin = function(req,res,next){
	var user_detail ={};
	var user = {
		username : req.body.username,
    	password : req.body.password	
	};
	modeluser.detail(user).then(function(rows){
		user_detail = rows[0];	
	})
	.then(function(rows){
		if(user_detail.status_id == 1){
			next();
		}
		else{
			res.status(401);
		    res.render('./error.html', {
		   		 title : "EROR"
		  	});
			
		}
	});
};

module.exports = super_user;