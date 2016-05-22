var knex = require('../db/index');

var post ={};

post.detail = function(posting){
	return knex('post')
		.innerJoin('post_kategori','post.id','=','post_kategori.id_post')
		.innerJoin('kategori','kategori.id','=','post_kategori.id_kategori')
		.where('post.id','=',posting.id);
};

post.user = function(filter){
	return knex('post')
		.innerJoin('post_kategori','post.id','=','post_kategori.id_post')
		.innerJoin('kategori','kategori.id','=','post_kategori.id_kategori')
		.where('post.id_user','=',filter.id_user)
		.orderBy('post.id', 'desc');

};

post.new = function(post){
	return knex('post').insert({
			id    :  post.id,
			id_user : post.id_user,
			title 	: post.title,
			body  	: post.body
		});
};
post.filter_as_user = function(user){
	return knex('post')
	.count('id as result')
	.where({
		id_user: user[0].id,
	});
}
post.update = function(user,post){
	return knex('post').update({
		id  	:  post.id,
		id_user : post.id_user,
		title 	: post.title,
		body  	: post.body
	});
};

module.exports =  post;