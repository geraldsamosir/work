var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 5080;
server.listen(port, function () {
  console.log('Server listening at port %d', port);


});

///routes

app.get('/',function(req,res){
    res.status(200);

    //arahlan ke login
    res.send('ini admin panel');
});

app.get('/room ',function(req,res){
    res.status(200);

    //arahlan ke room
    res.send('ini room');
});

app.get('/room/detail',function(req,res){
    res.status(200);

    //arahlan ke login
    res.send('ini spesifik room');
});

app.get('/user',function(req,res){
    res.status(200);

    //arahlan ke user
    res.send('ini user list');
});


