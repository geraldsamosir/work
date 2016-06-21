var express = require('express');
var router = express.Router();
var ctrl_image = require('../controller/image');

//midleware path
var upload = require('../midleware/image');

router.post('/upload', upload , ctrl_image.name);

module.exports = router;