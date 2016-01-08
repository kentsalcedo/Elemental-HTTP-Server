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

// handles server requests
function connection(request, response) {
  var method = request.method;
  var pathName = request.url;
  var fileType = path.extname(pathName);
  var postObject;
  var newPost;

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
      if (err) fs.readFile('./public/404.html', function(err,data){
        // if (err) console.log('error');
        // console.log('errrrrr');
        response.end();
        });
      response.end(data);
      });
  }

  if (method === "POST"){

    fs.exists('public/' + pathName, function(exists){
      if (exists){
        console.log('this exists, cannot overwrite');
      }
      else {
        var elementName = pathName.split('.')[0];
        elementName = elementName.replace('/','');
        console.log(pathName);

        fs.readFile('./public/template.html', function(err,data){
          if(err) console.log(err);

          newPost = data.toString();

          newPost = newPost.replace(/template/gi,elementName);

          fs.writeFile('public/' + pathName, newPost, function(err){
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
          console.log(newIndexFile);

            fs.writeFile('./public/index.html', newIndexFile, function(err,data){
            if (err) console.log(err);
            return;
            });

        });

      } // end of else

    }); // end of fs exists

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