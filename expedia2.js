var request = require('request');
var http = require('http');

const cheerio = require('cheerio')
const express = require('express')
const app = express()


app.get('/expedia', function (req, res) {
  // Set the headers
  var headers = {
    'activity-id':'<!--tlactivity-id: fbf3df7c-ae97-411e-b747-d7bcfc88853e-->',
    'Connection':'keep-alive',
    'Content-Encoding':'gzip',
    'Content-Length':42144,
    'Content-Type':'application/json;charset=UTF-8',
    'Date':'Sat, 15 Jul 2017 22:25:31 GMT',
    'P3P':'policyref="/w3c/p3p.xml", CP="CAO DSP IND COR ADM CONo CUR CUSi DEV PSA PSD DELi OUR COM NAV PHY ONL PUR UNI"',
    'Server':'nginx/1.9.13',
    'Set-Cookie':'currency=USD; Max-Age=157680000; Expires=Thu, 14 Jul 2022 22:25:31 GMT; Path=/; Domain=.expedia.com',
    'Set-Cookie':'linfo=v.4,|0|0|255|1|0||||||||1033|0|0||0|0|0|-1|-1; Max-Age=158000000; Expires=Mon, 18 Jul 2022 15:18:51 GMT; Path=/; Domain=.expedia.com',
    'Set-Cookie':'HMS=048fc402-3c87-4428-92be-63d504479bd6; Max-Age=1798; Expires=Sat, 15 Jul 2017 22:55:29 GMT; Path=/; Domain=.expedia.com',
    'Set-Cookie':'HSEWC=0; Max-Age=1798; Expires=Sat, 15 Jul 2017 22:55:29 GMT; Path=/; Domain=.expedia.com',
    'Trace-ID':'fbf3df7c-ae97-411e-b747-d7bcfc88853e',
    'Vary':'Accept-Encoding',
    'x-app-info':'expweb5552,release-2017-07-r2.6234.1856571',
    'X-EdgeConnect-Cache-Status':0,
    'X-Hcom-Styx-Info':'STYX.0.13.1.31;82170e90-69ac-11e7-8696-0242fc4a6ed8;noJvmRouteSet',
    'x-page-id':'page.Hotels.Search,H,20',
    'X-UA-Compatible':'IE=Edge'
  }

  // Configure the request

  var host= 'http://127.0.0.1:3001'
  var options = {
      url: host + '/Hotel-Search-Data?responsive=true&destination=Irvine%2C+California&latLong=33.682330%2C-117.766068&regionId=7819&startDate=07%2F11%2F2017&endDate=07%2F12%2F2017&_xpid=11905%7C1&adults=1&children=0&timezoneOffset=-25200000&siteid=1&langid=1033&hsrIdentifier=HSR&?1499891962553',
      method: 'POST',
      headers: headers
  }

  // Start the request
  request(options, function (error, response, body) {
     res.setHeader('Content-Type', 'application/json');
     var expedia = JSON.parse(body)
     var test = expedia['searchResults']['retailHotelModels']

     var array = []
     test.forEach(function(value){
          //var hotel_name = value['retailHotelInfoModel']['hotelName']
          var hotel_id = value['retailHotelInfoModel']['hotelId']
          //var price = value['retailHotelPricingModel']['priceFormatted']
          var obj = {}
          obj['id'] = hotel_id
        //  obj['price'] = price
          array.push(obj)
          delete obj

     })

        // prices
        var prices = []
        for (var i = 10; i < 12; i++) {
            n = i+1
            var options_urls = {
              url: 'https://www.expedia.com/api/hotels/pricehotel/506?start=8/'+ i +'/2017&end=8/'+ n +'/2017&channel=4&_=1498542883094',
              method: 'GET'
            }

            var myCallback = function(err, data) {
                if (err) throw err; // Check for the error and throw if it exists.
                  console.log('got data: '+data); // Otherwise proceed as usual.
            };


            request(options_urls, function (error, response, body2, callback) {
                  var expedia2 = JSON.parse(body2)
                  var price = expedia2['totalHotelPrice']['priceComponents'][0]['price']['amount']

                  var obj2={}
                  obj2['date']='08/'+i+'2017'
                  obj2['price']=price
                 callback(obj2)


            })
          //  prices.push(obj2)

        }
        res.send(prices)

  })


})




app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
