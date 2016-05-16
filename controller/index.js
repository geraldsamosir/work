var index ={};

index.home = function(req, res) {
	res.status(200);
    res.render('./homepage.html', {
   		 title : "BLOG ENGINE"
  	});
};

module.exports = index;