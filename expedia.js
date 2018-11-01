var http = require('http');

const cheerio = require('cheerio')
const express = require('express')
const app = express()


app.get('/expedia', function (req, res) {
  var asin = req.query.asin
  var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: true })

nightmare2
     .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
     .goto('https://www.expedia.com/Hotel-Search?destination=Irvine&regionId=7819&startDate=07%2F15%2F2017&endDate=07%2F16%2F2017')
     .evaluate(function () {
              return document;
           })
    .end()
    .wait(5000)
    .then(function (result) {
      const $ = cheerio.load(result)

      var array=[]
      var test = $('body').html()

/*
      $('#variationsTwister a').each(function(i, element){
          var link = $(this).attr('href')
         array.push(link)

   });
*/

      res.setHeader('Content-Type', 'application/json');

    //  var links = JSON.stringify(array);
      var resp_obj = {};
      //resp_obj['asin'] = asin
      resp_obj['links'] = test
      res.send(resp_obj)

    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });




})
app.listen(3000, function () {



  console.log('Example app listening on port 3000!')
})
