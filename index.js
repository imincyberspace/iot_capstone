var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var sensorValue = "None";

app.get(['/','/iot_capstone/'], function(req, res) {
  var fn=path.join(__dirname,"index.html");
  //console.log("Variable: " + req.params.sample);
  console.log("User logged on at " + new Date());
  res.sendFile(fn);
});

app.get(['/command','/iot_capstone/command'], function(req, res) {
  console.log("User logged on at " + new Date());
  res.send("cmd=siren");
});


app.head(['/sensor/:sensorValue','/iot_capstone/sensor/:sensorValue'], function(req, res) {
  sensorValue = req.params.sensorValue;
  console.log("HEAD request, Variable: " + sensorValue);
  io.sockets.emit('boom', {result: sensorValue});
  res.end();
});

io.on('connection', function(socket) {
  console.log('A user just logged on!');
  socket.on('disconnect', function() {
    console.log('A user just disconnected.');
  });
  socket.send(sensorValue);

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
