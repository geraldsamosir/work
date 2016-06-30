var knex = require('../db/index');

var pertemanan ={};

pertemanan.semua = function(){
	return knex('pertemanan');
};


pertemanan.filter = function(user,search){

	user = user[0];
   return knex("pertemanan").where({
		 id_yang_add : user.id,
		 id_yang_aprove : search.id
	})
	.orWhere({
		 id_yang_add : search.id,
		 id_yang_aprove : user.id	
	})
	
};
pertemanan.add = function(user){
	return knex('pertemanan')
		.insert({
			id_yang_add : user.adder,
			id_yang_aprove: user.target,
			status_add :1
		 });
};

pertemanan.confirm = function(user){
	return knex('pertemanan')
		.where({

			id_yang_aprove : user.confirmer,
			id_yang_add : user.target
		})
		.update({
			status_aprove : 1
		});
};

pertemanan.remove = function(user){
	//console.log(user);
	return knex('pertemanan')
	.where({
		id_yang_aprove : user.remover,
		id_yang_add : user.target
	})
	.orWhere({
		id_yang_aprove : user.target,
		id_yang_add : user.remover	
	})
	.del();
};

module.exports =  pertemanan;