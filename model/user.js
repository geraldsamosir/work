var knex = require('../db/index');

user ={};

user.add =function(visitor){
	console.log(visitor);
	return knex('user').insert({
		nama: visitor.username,
		email: visitor.email,
		password : visitor.password,
		status_id : 2
	});
};

user.login= function(user){
	console.log(user);
	return knex('user').countDistinct('nama')
		.where('nama','=',user.username)
		.andWhere('password','=',user.password);
}

/*user.post = function(user){
	return 
}*/

module.exports =  user;