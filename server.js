var net = require('net');
var fs = require('fs');

var server = net.createServer(serverConnection);

function serverConnection(socketReq){

  var date = new Date();

  socketReq.on('data', function(buffer){
    console.log('connection made!!!');
    console.log(buffer.toString());
    return socketReq.end();
  });

  socketReq.on('end', function(){
    console.log('connection ended');
  });
}

server.listen({port: 8080}, function(){
  address = server.address();
  console.log('server listening')
});