var modelimg = require('../model/image');

var image ={};

image.name = function(req,res){
	res.json(req.files);
}

image.upload_img_post = function(req,res){
	var file_name = [];
	res.status(200);
	for(i=0;i<req.body.img.length; i++){
		/*file_name.push(req.files[i].fieldname+Date.now()+".jpg");*/
		var data ={
			id_post :"2016-05-22T11:35:39.506Z-1-0",
			urlfoto :req.body.img[i].fieldname,

		};
		var index =  req.body.img[i].fieldname.indexOf("-");
		console.log(index);
		if(req.body.img[i].fieldname.substring(0,index) == 'gbrUtamaInputFile'){
			data.iskronologi = 1;
		}
		else{
			data.iskronologi = 0;	
		}
		modelimg.post_new(data).then(function(rows){
			
		});
	}

};

module.exports = image;