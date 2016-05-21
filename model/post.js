var knex = require('../db/index');

var post ={};

post.new = function(user,post){
	return knex('post').insert({
			id_user : user.id,
			title 	: post.title,
			body  	: post.body
		});
};
post.update = function(user,post){
	return knex('post').update({
		
	})
};

module.exports =  post;