var http = require('http');

const cheerio = require('cheerio')
const express = require('express')
const app = express()


app.get('/', function (req, res) {
  var asin = req.query.asin
  var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: true })

nightmare2
     .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
     .goto('https://www.amazon.com/gp/offer-listing/'+ asin +'/ref=dp_olp_new_mbc?ie=UTF8&condition=new')
     .screenshot('google111.png')
     .screenshot('google_2.png')
     .evaluate(function () {
              return document.getElementsByTagName('html')[0].innerHTML;
           })
    .end()
    .then(function (result) {
      const $ = cheerio.load(result)

    var array=[]
      $('#variationsTwister a').each(function(i, element){
          var link = $(this).attr('href')
         array.push(link)

   });

      res.setHeader('Content-Type', 'application/json');

    //  var links = JSON.stringify(array);
      var resp_obj = {};
      resp_obj['asin'] = asin
      resp_obj['links'] = array
      res.send(resp_obj)

    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });




})

app.get('/prices', function (req, res) {

  var url = req.query.url
  var Nightmare = require('nightmare');
  var nightmare2 = Nightmare({ show: true })

nightmare2
     .useragent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36")
     .goto('https://www.amazon.com' + url )
     .evaluate(function () {
              return document.getElementsByTagName('html')[0].innerHTML;
           })
    .end()
    .then(function (result) {
      const $ = cheerio.load(result)

      var array=[]
      $('span.olpOfferPrice').each(function(i, element){
          console.log('test')
          var price = $(this).text()
          array.push(price)

   });

      res.setHeader('Content-Type', 'application/json');

      //return json
      var resp_obj = {};
      resp_obj['links']=array
      res.send(resp_obj)

    })
    .catch(function (error) {
      console.error('Search failed:', error);
    });
})

app.listen(3000, function () {



  console.log('Example app listening on port 3000!')
})
