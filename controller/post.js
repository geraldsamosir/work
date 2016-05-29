var modeluser = require('../model/user');
var modelpost = require('../model/post');
var modelketegori = require('../model/kategori');


var post = {};

//filter post by user


// posting di profil

post.user = function(req,res){
	var result = {};
	var filter = {
		id_user : req.params.target_id,
	}

	modelpost.user(filter).then(function(rows){
		result = rows
	})
	.then(function(rows){
		modeluser.cari_by_id(filter).then(function(rows){
			for (var i = 0; i<result.length; i++) {
			 	result[i].user = rows[0];
			};
			res.json(result);
			
		});
	});
};


post.detail = function (req,res){
	var result = {};
	var post = {
		id: req.params.id
	};
	modelpost.detail(post).then(function(rows){
		result = rows[0];
	})

	.then(function(rows){
		modeluser.cari_by_id(result).then(function(rows){
			result.user =  rows[0];
			res.json(result);
		})
	});

};



post.new = function(req,res){
	var indexpost = "";
	var user_login = {
		username : req.body.username,
		password : req.body.password
	};
	var post ={};
	modeluser.detail(user_login).then(function(rows){
		user_login = rows;
	})
	.then(function(rows){
		modelpost.filter_as_user(user_login).then(function(rows){
			post = {
				id: new Date().toISOString()+"-"+user_login[0].id+"-"+rows[0].result,
				id_user : user_login[0].id,
				title : req.body.title,
				body : req.body.body
			};
		})
		.then(function(rows){
			modelpost.new(post).then(function(rows){
				post = rows;
			})
		})
		.then(function(rows){
		   var relation = {
		   		post_id : post.id,
		   		kategori : req.body.kategori_id
		   };
		   modelketegori.post_relation(relation).then(function(rows){
		   		res.json('sukses');
		   });
		});
		
	});
};

post.allkategori = function (req,res){
	modelketegori.all().then(function(rows){
		res.json(rows);
	});
};

post.update  = function(req,res){

};
post.delete = function (req,res){

};




module.exports = post;