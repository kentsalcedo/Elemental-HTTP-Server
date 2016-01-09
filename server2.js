// 'use strict'

var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var url = require('url');

var PORT = 8081;
var HOST = 'localhost';

var server = http.createServer(connection).listen(8081);

function connection(request,response){



  response.end();
}