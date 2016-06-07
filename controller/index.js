var index ={};

index.home = function(req, res) {
	res.status(200);
    res.render('./landing.html', {
   		 title : "BLOG ENGINE"
  	});
};

module.exports = index;