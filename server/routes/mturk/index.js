const log = require('debug')('app.js'),
	express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	yaml = require('yaml-config'),
  	path = require('path'),
  	MTURK_FILENAME = 'mturk_survey_code.json',
  	GRBS_FILENAME = 'GRBS.txt',
  	BIG_5_FILENAME = 'big5.txt',
  	QUESTIONS_PAGE_PAGE = 5;

exports.index = function(req, res, next) {
	// res.render('index', { title: 'Log Server' });
	// res.render('index', { title: 'Log Server' });
	
	console.log('rendering: mturk.index');
	
	// moved this to client side
	// biatSequence = req.biatConfig['STIMULI_PAIRS'].slice();
	// biatSequence = shuffle(biatSequence);
	// biatSequence.splice(0, 0, req.biatConfig['WARMUP_PAIR']);	

	// console.log(biatSequence);

	res.render('mturk', {title: 'BIAT: Mturk HIT', biatConfig: JSON.stringify(req.biatConfig), mturk: true});
};

exports.grbs = function(req, res, next) {

	var grbsFile = 'config/' + GRBS_FILENAME,
		step = 0;

	log(req.query.step);
	if(req.query.step) {
		step = parseInt(req.query.step);
	}
	

	fs.exists(grbsFile, function(exists) {
	  grbsQuestions = fs.readFileSync(grbsFile).toString().split('\n').slice(step, (step+QUESTIONS_PAGE_PAGE));
	  
	  if(grbsQuestions.length==0) {
	  	nextStep = 0; //signal reset or redirect
	  	log("RESET");
	  } else { //(grbsQuestions.length<QUESTIONS_PAGE_PAGE) {
	  	nextStep = step + grbsQuestions.length;
	  }
	  
	  log('rendering: mturk.grbs');
	  res.render('mturk_grbs', {title: 'BIAT: Mturk HIT', questions: grbsQuestions, step: step, nextStep: nextStep});
	  
	  // else { // redirect to end of study
	  // 	log('rendering: mturk.thanks');
	  //   res.redirect("/mturk/thanks");
	  // }
	});
};

exports.ocean = function(req, res, next) {

	var oceanFile = 'config/' + BIG_5_FILENAME,
		step = 0;

	log(req.query.step);
	if(req.query.step) {
		step = parseInt(req.query.step);
	}
	

	fs.exists(oceanFile, function(exists) {
	  oceanQuestions = fs.readFileSync(oceanFile).toString().split('\n').slice(step, (step+QUESTIONS_PAGE_PAGE));
	  
	  if(oceanQuestions.length==0) {
	  	nextStep = 0; //signal reset or redirect
	  	log("RESET");
	  } else { //(oceanQuestions.length<QUESTIONS_PAGE_PAGE) {
	  	nextStep = step + oceanQuestions.length;
	  }
	  
	  log('rendering: mturk.ocean');
	  res.render('mturk_ocean', {title: 'BIAT: Mturk HIT', questions: oceanQuestions, step: step, nextStep: nextStep});
	  
	  // else { // redirect to end of study
	  // 	log('rendering: mturk.thanks');
	  //   res.redirect("/mturk/thanks");
	  // }
	});
};

exports.thanks = function(req, res, next) {

	var mturk_file = 'config/' + MTURK_FILENAME,
		surveyCode = 'not found';

	fs.exists(mturk_file, function(exists) {
	  mturkRaw = fs.readFileSync(mturk_file);
	  surveyCode = JSON.parse(mturkRaw)['MTURK_SURVEY_CODE'];
	  
	  log('rendering: mturk.thanks');
	  res.render('mturk_thanks', {title: 'BIAT: Mturk HIT', surveyCode: surveyCode});
	});
};