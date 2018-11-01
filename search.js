
var http = require('http');
var jsesc = require('jsesc');


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {


var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: true })

   nightmare2
   .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
   .goto('https://www.instagram.com/accounts/login/')
    .wait(1000)
    .type("input[name*='username']",login)
    .type("input[name*='password']",'password')
    .click('._5f5mN')
    .screenshot('inst.png')
   .evaluate(function () {
     return [].map.call(document.querySelectorAll('a'), function(link) {
            return link.getAttribute('href');})
    })
  .then(function (result) {
  var fs = require('fs');
	fs.writeFileSync('testOutput.json', JSON.stringify(result));
  console.log('Done!');

  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });





});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(3000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
