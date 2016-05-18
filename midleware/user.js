var modeluser = require('../model/user');

var user ={};


user.register = function(req,res,next){
	 var visitor = {
    	username : req.body.username,
    	email	 : req.body.email,
    	password : req.body.password
    };
    modeluser.add(visitor).then(function(rows){
        next();   
    });
    
};


user.login  = function(req,res,next){
	 var visitor = {
    	username : req.body.username ,
    	password : req.body.password 
    };
    if(visitor.username = 'undefined'){
      visitor = {
            username : req.params.username ,
            password : req.params.password 
      };  
    }
    modeluser.login(visitor).then(function(rows){
        result = rows;
        if(result[0].result == 1 ){
            next();
        }
        else{
            res.status(403);
            res.send('username/password salah');
        }
        
    });    
    
};

module.exports = user;