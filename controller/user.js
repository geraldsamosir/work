var modeluser = require('../model/user');
var modelpertemanan = require('../model/pertemanan');

var CryptoJS = require("crypto-js");

var user ={};




// user
// authentification and idetification 
// function

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

	var slash = -1;
	do{
		var my_key = CryptoJS.AES
					.encrypt(JSON.stringify(user.username+":"+user.password), 'secret key 123');
		slash = my_key.toString().indexOf("/");

	}while(slash != -1);

	var result ={
		key :  my_key.toString()
	};
	res.status(200);
	res.json(result);
};

user.update =  function(req,res){
	res.status(200);
	var result = {};
	var update ={};
	var user_update = {
		nama : req.body.nama,
		password : req.body.newpassword,
		status_id : 2,
		fotoprofil :  req.body.fotoprofil,
		fotokronologi : req.body.fotokronologi,
		email : req.body.email
	};
	var user_login = {
		username : req.body.username,
		password : req.body.password
	};

	modeluser.detail(user_login).then(function(rows){
		user_login = rows;
	})
	.then(function(rows){
			user_update.id = user_login[0].id;
			modeluser.update(user_update).then(function(rows){
			user_login = user_update;
		});
	})
	.then(function(rows){
		modeluser.detail(user_login).then(function(rows){
			res.json('berhasil');
		})	
	});
};

user.allconfig = function(req,res){
	var user_login = {
		username : req.params.username,
		password : req.params.password
	};

	modeluser.detail(user_login).then(function(rows){
		res.json(rows);
	});
};




///routing sementara untuk desainer
user.profil = function(req, res) {
        res.render('./user.html', {
        title : req.params.username+" Profile" ,
        name : req.params.username
    });
};




// user
// relation
// and friendship
//function

user.search = function(req,res){
	//search friend
	res.status(200);
	var result = {};
	var user_login = {
		username : req.params.username,
		password : req.params.password
	};

	modeluser.detail(user_login).then(function(rows){
		user_login = rows;
		user_login.cari = req.params.cari;
	})
	.then(function(rows){
		modeluser.cari(user_login).then(function(rows){
			result = rows;
		})
		.then(function(rows){
			modelpertemanan.semua().then(function(rows){
				var table = {
					user : result ,
					pertemanan : rows
				};
				res.json(table);
			})
		})
	})
};


user.addfriend = function(req,res){
	console.log('here');
	var user_detail ={};
	var action ={};
	var user_login = {
		username : req.params.username,
		password : req.params.password,
		add 	  : req.params.target
	};
	modeluser.detail(user_login).then(function(rows){
		user_detail = rows;
		 action ={
			adder : user_detail[0].id,
			target : parseInt(user_login.add) 
		};
	})
	.then(function(rows){
		modelpertemanan.add(action).then(function(rows){

		});
	})
	.then(function(rows){
		modelpertemanan.semua().then(function(rows){
			res.json(rows);
		});
	});

};

user.confirm  = function(req,res){
	var user_detail ={};
	var action ={};
	var user_login = {
		username : req.params.username,
		password : req.params.password,
		confirm  : req.params.target
	};
	modeluser.detail(user_login).then(function(rows){
		user_detail = rows;
		 action ={
			confirmer : user_detail[0].id,
			target : parseInt(user_login.confirm ) 
		};
	})
	.then(function(rows){
		modelpertemanan.confirm(action).then(function(rows){

		});
	})
	.then(function(rows){
		modelpertemanan.semua().then(function(rows){
			res.json(rows);
		});
	});
   
};

user.deletefriend = function (req,res){
	var user_detail ={};
	var action ={};
	var user_login = {
		username : req.params.username,
		password : req.params.password,
		target  : req.params.target
	};
	modeluser.detail(user_login).then(function(rows){
		user_detail = rows;
		 action ={
			remover : user_detail[0].id,
			target : parseInt(user_login.target) 
		};
	})
	.then(function(rows){
		modelpertemanan.remove(action).then(function(rows){
			
		});
	})
	.then(function(rows){
		modelpertemanan.semua().then(function(rows){
			res.json(rows);
		});
	});
};

module.exports = user;