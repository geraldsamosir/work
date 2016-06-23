var multer = require('multer');
var  array_img =[];
var storage =   multer.diskStorage({
  
  destination: function (req, file, callback) {
    callback(null, 'public/images/app');
	
  },
  filename: function (req, file, callback) {
  	var name =file.fieldname + '-' + Date.now()+".jpg";
    file.originalname = file.fieldname + '-' + Date.now()+".jpg";
    callback(null, name);
    array_img.push(name);
	  //console.log(file.filename);

  },

});

var upload = multer({storage:storage});

module.exports = upload.any();
