var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/airplanes');

app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('morgan')('dev'));

app.use('/api/airplanes', require('./controllers/airplane'));

app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
