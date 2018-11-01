var http = require('http');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {


var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: true })

   nightmare2
   .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
   .goto('https://angel.co/login?utm_source=top_nav_job_profiles')
   .screenshot('google111.png')
   .type('#user_email',login)
   .type('#user_password',password)
   .click('.c-button')
   .screenshot('google_2.png')
   .evaluate(function () {

         })
  .end()
  .then(function (result) {
      console.log('here')
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });





});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
