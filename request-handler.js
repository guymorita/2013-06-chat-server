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

var handleRequest = function(request, response) {
  var statusCode;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  if(request.method === 'POST'){
    console.log("handing post!");
    statusCode = 201;
    response.writeHead(statusCode, headers);
    request.on('data', function(data){
      // gather data
      // input.push(data);
      input += data;
      // console.log(input);
      // console.log(request);
      // console.log('response', response);
    });
    request.on('end', function(data){
      response.write(input);
      console.log(input);
      // parse the gathered data
      // store the message somewhere
      // unshift something and push to some array
      response.end();
    });
    // response.end(input);
  } else if (request.method === 'GET') {
    if(request.url !== 'classes/messages'){
      statusCode = 404;
      response.writeHead(statusCode, headers);
    }
    response.end('[' + input + ']');
  }
  // // console.log('request', request);
  // var statusCode = 200;
  // console.log('response', response);
};

exports.handle = handleRequest;
