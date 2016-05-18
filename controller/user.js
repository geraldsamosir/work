var modeluser = require('../model/user');


var user ={};

user.register = function(req,res){
	var visitor ={
		username : req.body.username,
    	password : req.body.password
	};
	res.status(200);
	res.json(visitor);
};

user.login = function(req,res){
	var user = {
		username : req.body.username,
    	password : req.body.password	
	}
	res.status(200);
	res.json(user);
};

user.profil = function(req, res) {
        res.render('./user.html', {
        title : req.params.username+"#Profile" ,
        name : req.params.username
    });
};


user.search = function(req,res){
	//search friend
	var user_login = {
		username : req.params.username,
		cari 	 : req.params.cari
	}
	modeluser.cari(user_login).then(function(rows){
		res.status(200);
		console.log(rows);

	});

};

user.addfriend = function(req,res){
	console.log('ini addfriend');
};

user.confirm  = function(req,res){

};

user.notfication_friendadd = function(req,res){

};



module.exports = user;