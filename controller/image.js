var modelimg = require('../model/image');

var image ={};

image.name = function(req,res){
	res.json(req.files);
}

image.fiterby_post = function(req,res){
	var data ={};
	data.id_post = req.params.id_post;
	console.log(data);
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


module.exports = image;