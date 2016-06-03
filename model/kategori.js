var knex = require('../db/index');

var kategori ={};

kategori.new = function (kategori){

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


module.exports =  kategori;