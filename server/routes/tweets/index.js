var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	yaml = require('yaml-config'),
  path = require('path');

/* GET Tweet page. */
exports.index = function(req, res, next) {
  // res.render('index', { title: 'Log Server' });
  var filepath = path.join(__dirname + '/../../views/tweets.html');
  console.log(filepath);
  res.sendFile(filepath);
};
