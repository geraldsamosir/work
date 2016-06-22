var knex = require('../db/index');

var images = {};


images.post_new = function(data){
	console.log('here');
	return knex('image').insert({
		id_post : data.id_post,
		urlfoto : "/images/app/"+data.urlfoto,
		iskronologi : data.iskronologi
	});
}

images.post_update = function(data){
	return knex('image').update({
		urlfoto : "/images/app/"+data.urlfoto,
		iskronologi : data.iskronologi
	})
	.where({
		id_post : data.id_post,
		urlfoto : data.urlfoto_lama,
	})
}

images.select_by_post = function(data){
	return knex('image').where({
		id_post : data.id_post,
	});
}

module.exports =  images;