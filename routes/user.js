var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:username', function(req, res) {
        res.render('./user.html', {
        title : "BLOG ENGINE",
        name : req.params.username
        });
});

module.exports = router;
