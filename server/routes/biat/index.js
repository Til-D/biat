const log = require('debug')('app.js'),
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	yaml = require('yaml-config'),
  	path = require('path');

exports.index = function(req, res, next) {
	// res.render('index', { title: 'Log Server' });
	
	console.log('rendering: biat.index');
	// var filepath = path.join(__dirname + '/../../views/biat.html');
	// res.sendFile(filepath);
	res.render('biat', {title: 'BIAT', biatConfig: JSON.stringify(req.biatConfig)});
};

exports.biat = function(req, res, next) {


	var biatKey = req.params.biatKey,
		found = false;
	log('biat requested: ' + biatKey);
	for(var i=0; i<req.biatConfig['STIMULI_PAIRS'].length; i++) {
		var biatPair = req.biatConfig['STIMULI_PAIRS'][i];
		if(biatPair.indexOf(biatKey)!=-1) {

		// var filepath = path.join(__dirname + '/../../views/biat.html');
	 //  	console.log('rendering: ' + filepath);
	 //  	res.sendFile(filepath);
		 	log('BIAT found: ' + biatKey);
		 	log('image stimulus: ' + isImageStimulus);

		 	res.render('biat', {title: 'BIAT: ' + biatKey, biatConfig: JSON.stringify(req.biatConfig), biatKey: JSON.stringify(biatKey), biatIndex: i});
		 	found = true;
		 	break;
		}
	}
	
	// res.render('biat', { title: 'Not found!' });
	if(!found) {
		log('BIAT does not exist: ' + biatKey);
		res.render('404', { status: 404, url: req.url });
	}
}