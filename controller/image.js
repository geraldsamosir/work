var modelimg = require('../model/image');

var image ={};

image.name = function(req,res){
	res.json(req.files);
}

image.fiterby_post = function(req,res){
	var data ={};
	data.id_post = req.params.id_post;
	//console.log(data);
	modelimg.select_by_post(data).then(function(rows){
		res.json(rows);
	})
}

image.upload_img_post = function(req,res ,id_posting){
	//console.log('here');
	req.body.img = (req.body.img).split(",");
	//console.log(req.body.img);
	//console.log(id_posting)
	for(i=0;i<req.body.img.length; i++){
		/*file_name.push(req.files[i].fieldname+Date.now()+".jpg");*/
		var data ={
			id_post :id_posting,
			urlfoto :req.body.img[i],

		};
		var index =  req.body.img[i].indexOf("-");
		//console.log(index);
		if(req.body.img[i].substring(0,index) == 'gbrUtamaInputFile'){
			data.iskronologi = 1;
		}
		else{
			data.iskronologi = 0;	
		}
		//console.log(data);
		modelimg.post_new(data).then(function(rows){
			
		});
	}

};

image.upload_img_post_update = function(req,res ,id_post){
	var data = {};
	var last_data = {};
	data.id_post = id_post; 
	req.body.img = (req.body.img).split(",");
	modelimg.select_by_post(data).then(function(rows){
		last_data = rows;
	})
	.then(function(rows){
		//for(i=0;i<last_data.length ;i++){
		for(i=0;i<4;i++){
			if(req.body.img[i] == last_data[i].urlfoto){
				data.urlfoto = req.body.img[i];
			}
			else if(req.body.img[i] === ""){
				continue;
			}
			else if(req.body.img[i] === undefined){
				break;
			}
			else {
				data.urlfoto = "/images/app/"+req.body.img[i];	
			}

			data.id = last_data[i].id;
			modelimg.post_update(data).then(function(rows){
				//update
			});
			if(data.urlfoto  == ''){ 
				modelimg.delete_data(data).then(function(rows){
					//delete data
				});
		  	}
		}
	})
}


module.exports = image;