var knex = require('../db/index');

var post ={};

post.all  = function(){
	return knex('post')
	.select("post.id as id_post" ,"post.title" , "post.body" 
			, "user.nama as nama_user "," user.id as  id_user "
			, "kategori.id as id_kategori"
			, "user.fotoprofil", "user.fotokronologi","kategori.nama")
	.innerJoin('user','post.id_user','=','user.id')
	.innerJoin('post_kategori','post.id','=','post_kategori.id_post')
	.innerJoin('kategori','kategori.id','=','post_kategori.id_kategori')
	.orderBy('id_post','desc');
}

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
post.update = function(post){
	return knex('post').update({
		id_user : post.id_user,
		title 	: post.title,
		body  	: post.body
	}).where('post.id','=',post.id);
};

post.delete = function(post){
	return knex('post')
	.where({
		id : post.id
	})
	.del();
};

module.exports =  post;