var knex = require('../db/index');

var kategori ={};

kategori.new = function (kategori){
	return knex('kategori').insert({
		nama : kategori.nama
	});
};

kategori.update = function(kategori){
	return knex('kategori').update({
		nama : kategori.nama
	})
	.where('id','=',kategori.id);
};

kategori.all = function(){
	return knex('kategori')
		.orderBy('nama', 'asc');
}
kategori.post_relation = function(relation){
  	return knex('post_kategori').insert({
  		id_post :relation.post_id,
  		id_kategori : relation.kategori
  	});	
};

kategori.post_relation_update  = function(relation){
	return knex('post_kategori').update({
		id_post : relation.post_id,
		id_kategori : relation.kategori
	})
	.where('id_post','=',relation.post_id);
};

kategori.post_relation_delete= function(post){
	return knex('post_kategori')
	.where({
		id_post : post.id
	})
	.del();
};


module.exports =  kategori;