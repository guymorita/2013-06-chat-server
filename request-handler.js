/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

var input = '';

exports.handleRequest = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  if(request.method === 'POST'){
    console.log("handing post!");
    statusCode = 201;
    response.writeHead(statusCode, headers);
    request.on('data', function(data){
      input += data;
    });
    request.on('end', function(data){
      console.log(input);
      // response.write(input);
      response.end(input);
    });
  } else if (request.method === 'GET') {
    console.log('URL HERE', request.url);
    if(request.url !== 'classes/messages' && request.url !== 'http://127.0.0.1:8081/classes/room1'){
      statusCode = 404;
      response.writeHead(statusCode, headers);
    } else {
      statusCode = 200;
      response.writeHead(statusCode, headers);
    }

    response.end('[' + input + ']');
    input = '';
  }
};

