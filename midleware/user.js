var modeluser = require('../model/user');

var CryptoJS = require("crypto-js");


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
    key_params =  req.params.key  || null;
    key_body = req.body.key || null;
    var visitor = {};
    if(key_params != null || key_body != null){
        //decrited
        if(key_params != null){
            var bytes  = CryptoJS.AES.decrypt(key_params, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            var batas =  decryptedData.indexOf(":");
            visitor = {
                username : decryptedData.substring(0,batas),
                 password : decryptedData.substring(batas+1,decryptedData.length)
            };
            req.params.username = visitor.username;
            req.params.password = visitor.password;
        }
        else if(key_body != null){
            var bytes  = CryptoJS.AES.decrypt(key_body, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            var batas =  decryptedData.indexOf(":");
            visitor = {
                username : decryptedData.substring(0,batas),
                password : decryptedData.substring(batas+1,decryptedData.length)
            };
            req.body.username = visitor.username;
            req.body.password = visitor.password;
        }
        
    }
    else{

        visitor = {
            username : req.body.username  || null,
            password : req.body.password || null

        };
        if(visitor.username == null){
          visitor = {
                username : req.params.username ,
                password : req.params.password 
          };  
        }

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