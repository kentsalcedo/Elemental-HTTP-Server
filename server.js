var net = require('net');
var fs = require('fs');

var server = net.createServer(serverConnection);

function serverConnection(socketReq){

  var date = new Date();
  var uri = '/';

  socketReq.on('data', function(buffer){
    console.log('connection made');
    socketReq.write('HTTP/1.1 200 OK\n');
    socketReq.write('Server: localhost/1.4.6 (Ubuntu)\n');
    socketReq.write('Date: ' + date + '\n');
    socketReq.write('Content-Type: text/html; charset=utf-8\n');
    socketReq.write('Connection: keep-alive\n\n');

    // console.log(buffer.toString());
    socketReq.write('this should be in the body');
    return socketReq.end();
  });

  socketReq.on('end', function(){
    console.log('connection ended');
  });
}

server.listen({port: 8080}, function(){
  address = server.address();
  console.log('server listening');
});