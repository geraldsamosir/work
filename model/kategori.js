var knex = require('../db/index');

var kategori ={};

kategori.new = function (kategori){

};

kategori.all = function(){
	return knex('post_kategori');
}
kategori.post_relation = function(relation){
  	return knex('post_kategori').insert({
  		id_post :relation.post_id,
  		id_kategori : relation.kategori
  	});	
};


module.exports =  kategori;