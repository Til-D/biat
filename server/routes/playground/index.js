const log = require('debug')('app.js'),
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	yaml = require('yaml-config'),
  	path = require('path');

exports.index = function(req, res, next) {
	// res.render('index', { title: 'Log Server' });
	// res.render('index', { title: 'Log Server' });
	
	console.log('rendering: playground.index');
	res.render('playground', {title: 'BIAT Playground', biatConfig: JSON.stringify(req.biatConfig)});
};