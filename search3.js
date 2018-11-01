var http = require('http');
var Nightmare = require('nightmare');
// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  
  var nightmare2 = Nightmare({ show: false })
 
   nightmare2
   .goto('http://google.com')
  .end()
  .then(function (result) {
   response.end('test')
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });




  
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");