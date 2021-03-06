var modeluser = require('../../model/user');
var modelpost = require('../../model/post');

var modelketegori = require('../../model/kategori');
var modelpertemanan = require('../../model/pertemanan');
var ctrl_user = require('../user');
var ctrl_post = require('../post');

var CryptoJS = require("crypto-js");

super_user ={};

super_user.admin_page = function(req,res){
	res.status(200);
    res.render('./admin.html', {
   		 title : "ADMIN PAGE"
  	});
};

super_user.allconfig = function(req,res){
	ctrl_user.allconfig(req,res);
}

//user managemen

super_user.admin_get_users = function(req,res){
	//ctrl_user.search(req,res);
	res.status(200);
	var user_login = {
		username : req.params.username,
		password : req.params.password
	};
	if(req.params.cari  =="__alldata__" || req.params.cari =="__alldata__"){
		req.params.cari ="";
	}
	modeluser.detail(user_login).then(function(rows){
		user_login = rows;
		user_login.cari = req.params.cari;
	})
	.then(function(rows){
		modeluser.cari_join_status(user_login).then(function(rows){
			res.json(rows);
		});
	})
};

super_user.change_user = function(req,res){
	var user ={
		id : req.body.id,
		status_id : req.body.status_id
	}
	modeluser.update_status(user).then(function(rows){
		res.json('sukses');
	});
};

super_user.all_status = function(req,res){
	modeluser.all_status().then(function(rows){
		res.json(rows);
	});
};

//kategori management
super_user.admin_get_kategori = function(req,res){
	ctrl_post.allkategori(req,res);
};

super_user.add_kategori = function(req,res){
	var kategori = {
		nama : req.body.nama
	};
	modelketegori.new(kategori).then(function(rows){
		res.json('sukses');
	})
};

super_user.update_kategori = function(req,res){
	var kategori = {
		id : req.body.id,
		nama : req.body.nama
	}
	modelketegori.update(kategori).then(function(rows){
		res.json('sukses');
	});	
};

module.exports = super_user;	