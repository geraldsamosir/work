var express = require('express');
var router = express.Router();

/* login page. */
router.get('/', function(req, res) {
		res.status(200);
        res.render('index.ejs', {
        title : "BLOG ENGINE"
        });
});


module.exports = router;
