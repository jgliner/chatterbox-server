/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var results = {};
    results.storage = [];

var requestHandler = function(request, response) {
  console.log('-------------------request recieved---------------------');

  console.log("Serving request type " + request.method + " for url " + request.url);

  var body = [];


  if (request.method === 'POST') {
    // console.log('post!')
    // SAVE to server
    request.on('data', function(chunk) {
      body.push(chunk);
    });

    request.on('end', function() {
      body = Buffer.concat(body).toString();
      body = JSON.parse(body);
      results.storage.push(body);
    });
  }

    // Write header
    var statusCode = 200;
    var headers = defaultCorsHeaders;
    headers['Content-Type'] = "text/json";
    response.writeHead(statusCode, headers);


    if (request.method === 'GET') {
      // console.log('Get .....');
      console.log(results)
      response.end(JSON.stringify(results.storage));
    } else {
      // console.log('Post .........');
      response.end(JSON.stringify({}))
    };

  // console.log(storage);
  // request.method === 'GET' ? response.end(JSON.stringify(storage)) : response.end({});
};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports.handleRequests = requestHandler;
module.exports.defaultCorsHeaders = defaultCorsHeaders;








