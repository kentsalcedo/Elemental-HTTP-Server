var http = require('http');
var fs = require('fs');
var PORT = 8080;
var HOST = 'localhost';
var server = http.createServer(socketReq);
var body = 'hello world!';

function socketReq(request, response){

  response.writeHead (200, {
    'Content-Type' : 'text/html'
  });
  return response.end();
}
// function serverConnection(socketReq){

//   var date = new Date();
//   var uri = '/';

//   socketReq.on('data', function(buffer){
//     var request = buffer.toString().split('\n'); // get's header request and returns array
//     var requestLineOne = request[0].split(' '); // take line one of the request header and returns array
//     var requestType = requestLineOne[0];
//     var uri = requestLineOne[1];
//     console.log(requestLineOne);
//     console.log(requestType + ': request type');
//     console.log(uri + ': uri');
//     console.log('connection made');

//     socketReq.write('HTTP/1.1 200 OK\n');
//     socketReq.write('Server: localhost/1.4.6 (Ubuntu)\n');
//     socketReq.write('Date: ' + date + '\n');
//     socketReq.write('Content-Type: text/html; charset=utf-8\n');
//     socketReq.write('Connection: keep-alive\n\n');
//     // console.log(buffer.toString());
//     socketReq.write('this should be in the body');
//     return socketReq.end();
//   });

//   socketReq.on('end', function(){
//     console.log('connection ended');
//   });
// }

server.listen({port: PORT}, function(){
  address = server.address();
  console.log('server listening');
});