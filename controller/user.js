var user_model = require('../model/user');


var user ={};

user.register = function(req,res){
	res.status(200);
	res.send('User Berhasil di daftarkan silahkan login untuk mengakses');
};
user.login = function(req,res){
	res.status(200);
	res.send('Login');	
};

user.profil = function(req, res) {
        res.render('./user.html', {
        title : req.params.username+" Profile" ,
        name : req.params.username
    });
};


user.search = function(req,res){
	//search friend
};

user.addfriend = function(req,res){

};

user.confirm  = function(req,res){

};

user.notfication_friendadd = function(req,res){

};



module.exports = user;