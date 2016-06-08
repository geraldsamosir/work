var knex = require('../db/index');

user ={};
user.detail = function(user){
	return knex('user')
		.where({
			nama: user.username,
			password : user.password
		});
};
user.friend_detail = function(user){
	return knex.select('id','nama','fotoprofil','fotokronologi')
			.table('user')
			.where({
				id :  user.target
			});
};
user.friends_friend  = function(user){
	return knex('pertemanan')
		.where('pertemanan.id_yang_add' , '=', user.id)
		.orWhere('pertemanan.id_yang_aprove' , '=', user.id)

};
user.add =function(visitor){
	return knex('user')
		.insert({
			nama: visitor.username,
			email: visitor.email,
			password : visitor.password,
			status_id : 2
		});
};

user.login= function(user){
	//console.log(user);
	return knex('user')
		.count('nama as result')
		.where({
			nama : user.username,
			password: user.password
		});
};

user.update = function(user){
	return knex('user').update({
		nama : user.nama,
		password : user.password,
		status_id : user.status_id,
		fotoprofil : user.fotoprofil,
		fotokronologi : user.fotokronologi,
		email : user.email
	}).where({
		id : user.id
	});
}

user.update_status = function(user){
	return knex('user').update({
		status_id : user.status_id
	}).where({
		id : user.id
	});
}

user.cari =  function(user){
	return knex.select('id','nama','fotoprofil','fotokronologi')
		.table('user')
		.where('nama','like','%'+user.cari+'%')
		.orderBy('nama', 'asc');

};
user.cari_by_id = function(user){
	return knex.select('id','nama','fotoprofil','fotokronologi')
		.table('user')
		.where('id','like','%'+user.id_user+'%')
		.orderBy('nama', 'asc');
};



module.exports =  user;