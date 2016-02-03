/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var results = {};
results.results = [];

var requestHandler = function(request, response) {
  console.log('-------------------request recieved---------------------');

  console.log("Serving request type " + request.method + " for url " + request.url);

  var body = [];


  if (request.method === 'POST') {
    // SAVE to server
    request.on('data', function(chunk) {
      body.push(chunk);
    });

    request.on('end', function() {
      // body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      results.results.push(body);
    });
  }

  // Write header
  var statusCode = request.method === 'GET' ? 200 : 201;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/json";
  response.writeHead(statusCode, headers);


  response.end(JSON.stringify(results));   
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
module.exports.defaultCorsHeaders = defaultCorsHeaders;








