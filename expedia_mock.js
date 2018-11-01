//mock expedia

var http = require('http');
var fs = require('fs');

const cheerio = require('cheerio')
const express = require('express')
const app = express()



app.post('/*', function (req, res) {

      res.setHeader('Content-Type', 'application/json');
      fs.readFile('expedia.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.send(obj)
      });




    })


app.listen(3001, function () {



  console.log('Example app listening on port 3000!')
})
