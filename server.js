// required modules
var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var url = require('url');

var PORT = 8080;
var HOST = 'localhost';

// create instance of server
var server = http.createServer(connection);

// helper function to return error 404 page


// handles server requests
function connection(request, response) {
  var method = request.method;
  var pathName = request.url;
  var fileType = path.extname(pathName);
  var postObject;
  var newPost;

  if ( method === 'PUT'){
    console.log('PUT request');
    response.writeHead(200, {
      'Content-Type' : "text/" + fileType.replace('.','')
    });
    response.end();
  } // end of response if PUT request

  if (method === "GET"){
    response.writeHead(200, {
      'Content-Type' : "text/" + fileType.replace('.','')
    });

    if (pathName === '/'){
      pathName = '/index.html';
      response.writeHead(200, {
        'Content-Type' : 'text/html'
      });
    }

    fs.readFile("./public" + pathName, function(err,data){
      if (err) console.log('404 FILE NOT FOUND');
      response.end(data);
      });
  } // end of response if GET request

  if (method === "POST"){

    request.on('data', function(chunk){
      var newElementForm = querystring.parse(chunk.toString());

      // console.log('public/' + newElementForm.elementName +'.html');

      response.writeHead(201, {
        'Content-Type' : "text/" + fileType.replace('.','')
      });

      fs.access('public/' + newElementForm.elementName + '.html', fs.F_OK, function(err){
      // fs.access('public/index.htm', fs.F_OK, function(err){

        if (err) {
          console.log('can create new file');

            var elementName = newElementForm.elementName;

            fs.readFile('./public/template.html', function(err,data){
              if(err) console.log(err);

              newPost = data.toString();
              newPost = newPost.replace( /template/gi,elementName);
              newPost = newPost.replace(/ATOMICNUMBER/gi,newElementForm.elementAtomicNumber);
              newPost = newPost.replace(/ELEMENTSYMBOL/gi,newElementForm.elementSymbol);
              newPost = newPost.replace(/DESCRIPTION/gi,newElementForm.elementDescription);

              fs.writeFile('public/' + elementName + '.html', newPost, function(err){
                if(err) console.log('error');
                console.log('file created!');

              }); // end of fs.write

            }); // end of fs.readfile

            var newIndexFile;

            fs.readFile('./public/index.html', function(err,data){
              if(err) console.log(err);
              var currentIndexFile = data.toString().split('<');
              var newElementListItem = 'a href="./' + elementName + '.html">' + '<li>' + elementName.toUpperCase() + '</li></a>';
              currentIndexFile.splice(currentIndexFile.lastIndexOf('!--end of list -->')-2,0,newElementListItem);
              newIndexFile = currentIndexFile.join('<');
              // console.log(newIndexFile);

                fs.writeFile('./public/index.html', newIndexFile, function(err,data){
                if (err) console.log(err);
                return;
                });

            }); // ends read file that updates index.html

          } // end of else, else is the situation that creates file on if doesn't exist yet

        else {
          console.log('this exists, cannot overwrite');
        }

      });

    }); // end of on data requests

  response.end();
  }

} // end of connection function


// server listening
server.listen({
  host : HOST,
  port : PORT
  }, function(){
  console.log('server listening');
});