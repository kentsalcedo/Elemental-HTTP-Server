var http = require('http');
var net = require('net');
var fs = require('fs');
var PORT = 8080;
var HOST = 'localhost';
var body = 'hello world!';

var server = http.createServer();

var postData = 'hello world';

var options = {
  hostname: 'localhost',
  port: 8080,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, (res) => {
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log('BODY CHUNK');
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});

req.write(postData);
req.end();