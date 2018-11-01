var Xvfb = require('xvfb');
var Nightmare = require('nightmare');

var xvfb = new Xvfb({
    silent: true
});
xvfb.startSync();

var nightmare = Nightmare({
    show: false,
    webPreferences: {
        partition: 'custom'
    }
});

nightmare
    .goto('https://google.com')
    .evaluate(function () {
        return document.title;
    })
    .end()
    .then(function (title) {
        console.log(title);
        xvfb.stopSync();
    });