// Variables
var path = require('path');
var express = require('express');
var app = require('express')();
var cookieParser = require('cookie-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// App directories
var PROJECT_DIR = path.normalize(__dirname);
var PUBLIC_DIR = path.resolve(PROJECT_DIR + '/src');

// Add the src folder
app.use(express.static(path.join(__dirname, 'src')));

// Add the bower components folder
app.use('/bower_components',  express.static( path.join(__dirname, '/bower_components')));

// Set up the cookies
app.use(cookieParser());

// return back the index file
app.get('*', function(req, res){
    res.sendFile(PUBLIC_DIR + '/index.html');
});

// Listen on port 8000;
http.listen(8001, function(){
    console.log('                               (\r\n                      .-\'\'\'-..\' \\                      _____           _____\r\n            _______ .\'       -   \\                 ,ad8PPPP88b,     ,d88PPPP8ba,\r\n          <<<<<<<< );__   ,,,_)   \\               d8P\"      \"Y8b, ,d8P\"      \"Y8b\r\n             <<<<<<<<< ) ;C  \/     \\             dP\'           \"8a8\"           `Yd\r\n               <<<<<< (.-\'-.  )====_)_=======>   8(              \"              )8\r\n                 <<<<< \\    \'\'\'\'\'\'\'   )          I8                             8I\r\n                 ;  <<<     .......__\/            Yb,                         ,dP\r\n            .-\'\'\'         (         )              \"8a,                     ,a8\"\r\n         .-\'              ;.       \/                 \"8a,                 ,a8\"\r\n        \/  .-\'     .     =  .     \/                    \"Yba             adP\"\r\n    _-\'\'\\_\/         \'. .\'    .   \/                       `Y8a         a8P\'\r\n .-\'  )  ;\\          \'\'\'.     . \/                          `88,     ,88\'\r\n;   .\'\'\'\'  `.       \'    ;     (                             \"8b   d8\"  Server\r\nO -\'        .\'\'\'       .\'                                     \"8b d8\"   Running\r\n          .\'   .-\'\'\'\'\'`      (__)))                            `888\'\r\n          \'o-\'           (  )XPRO(__)))                         \"\r\n');
});

// IO Connections
io.on('connection', function(socket){

});

