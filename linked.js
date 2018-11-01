var http = require('http');
var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/test');





// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {




var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: true })
   nightmare2
   .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
   .goto('https://www.linkedin.com')
   .type('#login-email',login)
   .type('#login-password',password)
   .click('form[action*="https://www.linkedin.com/uas/login-submit"] [type=submit]')
   .screenshot('nopasarn.png')
   .wait(29000)
   .then(function(result){


        var linkedinSchema = new mongoose.Schema({
        hash: String
      , pin: String
      , email: String
      });

      var LUser = mongoose.model('LUser', linkedinSchema);

        return LUser.findOne({hash: '4ad7747d84dd4d30b18f340376f05869'},function(err, users) {
                        if (err) return console.error(err);
                        code=users.pin


                     }).then(function(data){
                        console.log(data.pin)
                        return nightmare2
                       .screenshot('verif.png')
                      .type('#verification-code',data.pin)
                      .screenshot('verif.png')
                       .click('#btn-primary')
                       .wait(2000)
                       .screenshot('done.png')
        })


   })
   .catch(function (error) {
    console.error('Search failed:', error);
  });






});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8001);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");
