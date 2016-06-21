var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

//make controler path ...
var index = require('./routes/index');
var user = require('./routes/user');
var post = require('./routes/post');
var images = require('./routes/image');
var super_usr = require('./routes/admin/super_user');



var app = express();

//Nunjucks setup
nunjucks.configure('./public/views', {
	autoescape: true,
	express: app
});
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Routes setup

app.use('/', index);

app.use('/user',user);

app.use('/post',post);

app.use('/admin', super_usr);

app.use('/images', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
       res.status(404);
      res.render('error.html', {
            title : "EROR"
      });
      
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
