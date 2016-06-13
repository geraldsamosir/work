var modeluser = require('../model/user');
var modelpost = require('../model/post');
var modelpertemanan = require('../model/pertemanan');

var CryptoJS = require("crypto-js");

var user ={};




// user
// authentification and idetification 
// function

user.register = function(req,res){
	var result ={};
	var slash =-1;
	var visitor ={
		username : req.body.username,
    	password : req.body.password
	};
	do{
		var my_key = CryptoJS.AES
					.encrypt(JSON.stringify(visitor.username+":"+visitor.password), 'secret key 123');
		slash = my_key.toString().indexOf("/");

	}while(slash != -1);
	result ={
		key : my_key.toString(),
		admin : false
	};
	res.status(200);
	res.json(result);

};

user.login = function(req,res){
	var super_user ;
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
			super_user = true;
		}
		else{
			super_user = false;
		}
		var slash = -1;
		do{
			var my_key = CryptoJS.AES
						.encrypt(JSON.stringify(user.username+":"+user.password), 'secret key 123');
			slash = my_key.toString().indexOf("/");

		}while(slash != -1);
		var result ={
			key :  my_key.toString(),
			admin : super_user
		};
		res.json(result);
	})
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


user.friendship_filter = function(user_login,table){
	var group ={
		pertemanan : [],
		add :[] ,
		confirm:[],
		akunsendiri:[],
		un_friend : []
	};
	for(var a in table.user){
		for(var b in table.pertemanan){
			if(user_login[0].id != table.user[a].id){
				if((user_login[0].id == table.pertemanan[b].id_yang_add
					&& table.user[a].id == table.pertemanan[b].id_yang_aprove)
					||(user_login[0].id == table.pertemanan[b].id_yang_aprove 
					&& table.user[a].id == table.pertemanan[b].id_yang_add)
				){
				if(table.pertemanan[b].status_aprove ==1 
					&& table.pertemanan[b].status_add ==1){
					table.user[a].pertemanan =1;
					table.user[a].add = 0;
					table.user[a].confirm = 0;
					table.user[a].akunsendiri =0;
					
				}
				else if(table.pertemanan[b].status_aprove ==0
					&& table.pertemanan[b].status_add ==1
					&&  user_login[0].id == table.pertemanan[b].id_yang_add){
					table.user[a].pertemanan =0;
					table.user[a].add = 1;
					table.user[a].confirm = 0;
					table.user[a].akunsendiri =0;
				}
				else if(table.pertemanan[b].status_aprove ==0
					&& table.pertemanan[b].status_add ==1
					&&  user_login[0].id == table.pertemanan[b].id_yang_aprove){
					table.user[a].pertemanan =0;
					table.user[a].add = 0;
					table.user[a].confirm = 1;
					table.user[a].akunsendiri =0;
				}
								
				}
			}
			else {
				table.user[a].pertemanan =0;
				table.user[a].add = 0;
				table.user[a].confirm = 0;	
				table.user[a].akunsendiri =1;
			}
		}
	}
	for(var x in table.user){
		if(table.user[x].pertemanan ==1){
			group.pertemanan.push(table.user[x]);
		}
		else if(table.user[x].add ==1){
			group.add.push(table.user[x]);
		}
		else if(table.user[x].confirm ==1){
			group.confirm.push(table.user[x])
		}
		else if(table.user[x].akunsendiri ==1){
			group.akunsendiri.push(table.user[x]);
		}
		else{
			group.un_friend.push(table.user[x]);
		}

	}			
	return group;
}

user.search = function(req,res){
	//search friend
	res.status(200);
	var result = {};
	var group ={};
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
		modeluser.cari(user_login).then(function(rows){
			result = rows;
		})
		.then(function(rows){
			modelpertemanan.semua().then(function(rows){
				var table = {
					user : result ,
					pertemanan : rows
				};
				group = user.friendship_filter(user_login, table);
				res.json(group);
			})
		})
	})
};

user.friend_detail = function(req,res){
	var group ={};
	var user_detail ={};
	var friend_detail ={};
	var friend_detail_X ={};
	var filter = {};
	var friend_friends = [];
	var result ={};
	var action ={};
	var table = {};
	var user_login = {
		username : req.params.username,
		password : req.params.password,
		add 	  : req.params.target,
		cari : ''
	};

	modeluser.detail(user_login).then(function(rows){
		user_login.id =  rows[0].id;
		user_detail = rows;
		 action ={
			adder : user_detail[0].id,
			target : parseInt(user_login.add) 
		};
	})
	.then(function(rows){
		modeluser.friend_detail(action).then(function(rows){
			//get friend information detail
			friend_detail = rows[0];
			friend_detail_X = rows;
			
		})
		.then(function(rows){
			var temp ="" ;
			var usr  = {};
			var frtmp = [];
			modeluser.friends_friend(friend_detail).then(function(rows){
				result = rows;
			})
			modeluser.cari(user_login).then(function(rows){
				for(var x  in result){
					if(result[x].id_yang_add == friend_detail.id){
						usr.id = result[x].id_yang_aprove;
					}
					else{
						usr.id = result[x].id_yang_add;
					}
					for(var y in rows){
						if(rows[y].id == usr.id){
							friend_friends.push(rows[y]);	
						}
					}
				}
					
			})
			.then(function(rows){
				filter.id_user =  friend_detail.id;
				modelpost.user(filter).then(function(rows){
					friend_detail.post = rows;
				})
				.then(function(rows){
				modelpertemanan.semua().then(function(rows){
					console.log(user_detail);
					table.user = friend_friends;
					table.pertemanan = rows;;
					friend_detail.pertemanan = user.friendship_filter(user_detail, table);
					res.json(friend_detail);
				})

			})
			})
		});
	});
};

user.addfriend = function(req,res){
	
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