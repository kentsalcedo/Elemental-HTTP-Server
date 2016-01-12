// required modules
var http = require('http');
var fs = require('fs');
var path = require('path');
var querystring = require('querystring');
var url = require('url');

// set port and host
var PORT = 8080;
var HOST = 'localhost';

// create instance of server
var server = http.createServer(connection);

// handles server requests
function connection(request, response) {
  var method = request.method;
  var pathName = request.url;
  var fileType = path.extname(pathName);
    if ( pathName === '/') {
      pathName = '/index.html';
      fileType = 'html';
    }
  var postObject;
  var newPost;

  console.log(method, ' method');

  ///////// handles the GET request
  if (method === 'GET'){
    handleGetRequest(request,response,method,pathName,fileType);
  }

  ///////// handles the POST request
  if (method === 'POST'){
    handlePostRequest(request,response,method,pathName,fileType);
  }

  ///////// handles the PUT request
  if (method === 'PUT'){
    handlePutRequest(request,response,method,pathName,fileType);
  }

} // end of connection function

// server listening
server.listen({
  host : HOST,
  port : PORT
  }, function(){
  console.log('server listening');
});

////////////////////////////////////////////////////////////
/////////////// handles GET requests ///////////////////////
////////////////////////////////////////////////////////////
function handleGetRequest(request,response,method,pathName,fileType){

    fs.readFile("./public" + pathName, function(err,data){
      if (err) {
        return fs.readFile('./public/404.html', function(err, data){
          if (err) console.log(err);
          response.end(data);
        });
      }
      response.end(data);
    });

}

////////////////////////////////////////////////////////////
///////////////// handles POST requests/////////////////////
////////////////////////////////////////////////////////////
function handlePostRequest(request,response,method,pathName,fileType){
  request.on('data', function(data){
      var newElementForm = querystring.parse(data.toString());

      // console.log('public/' + newElementForm.elementName +'.html');

      response.writeHead(201, 'File Made', {
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
              newPost = newPost.replace( /template/gi,elementName.toUpperCase());
              newPost = newPost.replace(/ATOMICNUMBER/gi,newElementForm.elementAtomicNumber);
              newPost = newPost.replace(/ELEMENTSYMBOL/gi,newElementForm.elementSymbol.toUpperCase());
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

              // console.log(elementCount);
              newIndexFile = currentIndexFile.join('<');


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
} // end of POST

////////////////////////////////////////////////////////////
///////////////// handles PUT requests//////////////////////
////////////////////////////////////////////////////////////

function handlePutRequest(request,response,method,pathName,fileType){
  request.on('data', function(data){
      var newElementForm = querystring.parse(data.toString());

      // console.log('public/' + newElementForm.elementName +'.html');

      response.writeHead(201, 'File Made', {
        'Content-Type' : "text/" + fileType.replace('.','')
      });

      fs.access('public/' + newElementForm.elementName + '.html', fs.F_OK, function(err){
      // fs.access('public/index.htm', fs.F_OK, function(err){

        if (err) console.log('Cannot do PUT request, file does not exist') ;
        // end of else, else is the situation that creates file on if doesn't exist yet

        else {

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
                console.log('file updated!');

              }); // end of fs.write

            }); // end of fs.readfile

          }

      });

    }); // end of on data requests

  response.end();
} // end of POST