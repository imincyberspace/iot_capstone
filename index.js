var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get(['/', '/:sample'], function(req, res) {
  var fn=path.join(__dirname,"index.html");
  console.log("Variable: " + req.params.sample);
  io.sockets.emit('boom', {result: req.params.sample});
  res.sendFile(fn);
});

io.on('connection', function(socket) {
  console.log('A user just logged on!');
  socket.on('disconnect', function() {
    console.log('A user just disconnected.');
  });

});

/*
var server = http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("Hello from NodeJS!\nBye!");
    console.log("Received a request! Boom!");
});
*/

http.listen(8080, function() {
  console.log("This is a test.");
});
