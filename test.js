
var http = require('http');
var jsesc = require('jsesc');
var html2json = require('html2json');


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

  var start = new Date();
var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: false })

   nightmare2
   .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
   .goto('https://booking.com')
   .evaluate(function () {
            return document.body.innerHTML
    })
  .end()
  .then(function (result) {
  var json = html2json(result);
  //var test=JSON.stringify(result)
  console.log(json)
         console.log('Request took:', new Date() - start, 'ms');
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });





});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(3001);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
