var modeluser = require('../model/user');

var user ={};


user.register = function(req,res,next){
	 var visitor = {
    	username : req.body.username,
    	email	 : req.body.email,
    	password : req.body.password
    };
    //call db
    modeluser.add(visitor);

    next();
};


user.login  = function(req,res,next){
	 var visitor = {
    	username : req.body.username,
    	password : req.body.password
    };
    //call db
    modeluser.login(visitor);
    next();
    
};



module.exports = user;