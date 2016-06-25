var knex = require('../db/index');

var images = {};


images.post_new = function(data){
	//console.log('here');
	return knex('image').insert({
		id_post : data.id_post,
		urlfoto : "/images/app/"+data.urlfoto,
		iskronologi : data.iskronologi
	});
}

images.post_update = function(data){
	return knex('image').update({
		urlfoto : data.urlfoto,
	})
	.where({
		id : data.id,
	})
}

images.select_by_post = function(data){
	return knex('image').where({
		id_post : data.id_post,
	});
}

images.delete_data  = function(data){
	return knex('image').where({
		id : data.id ,
	})
	.del();
}

images.delete_by_post_id = function(data){
	return knex('image').where({
		id_post :data.id,
	})
	.del();
}

module.exports =  images;