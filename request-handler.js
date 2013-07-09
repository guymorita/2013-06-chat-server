/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var fs = require("fs");


var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var input = [];

exports.handleRequest = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  if(request.method === 'POST'){
    statusCode = 201;
    response.writeHead(statusCode, headers);
    request.on('data', function(data){
      input.push(JSON.parse(data));
    });
    request.on('end', function(){
      response.end();
    });
  } else if (request.method === 'GET') {
      // statusCode = 404;
      // response.writeHead(statusCode, headers);
      console.log(request.url);
      statusCode = 200;
      response.writeHead(statusCode, headers);
      if (request.url === "/"){
        var contents = fs.readFileSync('./2013-06-chat-client/index.html');
          response.writeHead(200, { 'content-type': 'text/html'});
          response.end(contents);
      } else if (request.url === '/css/reset.css'){
        var resetcss = fs.readFileSync('./2013-06-chat-client/css/reset.css');
          response.writeHead(200, { 'content-type': 'text/css'});
          response.end(resetcss);
      } else if (request.url === '/css/styles.css'){
        var stylescss = fs.readFileSync('./2013-06-chat-client/css/styles.css');
          response.writeHead(200, { 'content-type': 'text/css'});
          response.end(stylescss);
      } else if (request.url === '/js/setup.js'){
        var setupjs = fs.readFileSync('./2013-06-chat-client/js/setup.js');
          response.writeHead(200, { 'content-type': 'text/javascript'});
          response.end(setupjs);
      } else if (request.url === '/js/backbone.js'){
        var backbonejs = fs.readFileSync('./2013-06-chat-client/js/backbone.js');
          response.writeHead(200, { 'content-type': 'text/javascript'});
          response.end(backbonejs);
      } else if (request.url === '/vendor/jquery/jquery-1.9.1.js'){
        var jquery = fs.readFileSync('./2013-06-chat-client/vendor/jquery/jquery-1.9.1.js');
          response.writeHead(200, { 'content-type': 'text/javascript'});
          response.end(jquery);
      }

    response.end(JSON.stringify(input));
  } else if (request.method === 'OPTIONS') {
    headers["access-control-allow-origin"] = "*";
    headers["access-control-allow-methods"] = "POST, GET, PUT, DELETE, OPTIONS";
    headers["access-control-allow-headers"] = "content-type, accept";
    response.writeHead(200, headers);
    response.end();
  }
};

