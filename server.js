var http = require('http');
// var net = require('net');
var fs = require('fs');
var PORT = 8080;
var HOST = 'localhost';
var body = 'hello world!';

// creates HTTP tunnel server
var server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('attach to body on end');

  var method = req.method;
  console.log(method, ': method');

  if (method === 'GET'){
    console.log('this is a get request');
  }

});

server.listen({
  host : HOST,
  port : PORT
  },
  function(){
    address = server.address();
    console.log("opened server address: ", address);
});

// server.on('connect', (req,cltSocket,head)=> {

// });



// server.on('connect', (req,cltSocket,head) => {
//   console.log('on connect listener');
// });
// server.on('connect', req, socket, head) => {
//   // connection to server
//   // var srcSocket = net.connect

// }

// function socketReq(request, response){
//   // console.log(response);

//   // response.writeHead (200, {
//   //   'Content-Type' : 'text/html'
//   // });

//   response.write('chunk', 'utf-8',function(){
//     console.log('entered response write');
//   });

//   return response.end();
// }