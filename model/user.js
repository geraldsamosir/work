var knex = require('../db/index');

user ={};

user.add =function(visitor){
	return knex('user').insert({
		nama: visitor.username,
		email: visitor.email,
		password : visitor.password,
		status_id : 2
	});
};

user.login= function(user){
	//console.log(user);
	return knex('user').count('nama as result')
		.where('nama','=',user.username)
		.andWhere('password','=',user.password);
}

user.cari =  function(user){
	return knex.select('id','nama','fotoprofil',)
		.table('user')
		.where('nama','like','%'+user.cari+'%');
}

module.exports =  user;