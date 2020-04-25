var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var yaml = require('yaml-config');
var indexRouter = require('./routes/index');
var tweetRouter = require('./routes/tweets/');
var biatRouter = require('./routes/biat/');
var playgroundRouter = require('./routes/playground/');
var mturkRouter = require('./routes/mturk/');
var fs = require('fs');
var bodyParser = require('body-parser');
var log = require('debug')('app.js');

var CONFIG_FILE = __dirname + '/config/server-config.yml';
var BIAT_FILE = __dirname + '/config/biats.json';

log('Reading in config file: ' + CONFIG_FILE);

//create file structure and log files
fs.exists(CONFIG_FILE, function(exists) {
    if (exists) {
        var settings = yaml.readConfig(CONFIG_FILE),
        	logs = process.env.LOGDIR; //__dirname + settings.logDirectory;

        log('Server settings:');
        log(settings);

        fs.exists(logs, function(exists) {
		    if (!exists) {
		        fs.mkdir(logs, function(err) {
		           log('+ log directory created at: ' + logs); 
		        });
		    }
		});

	} else {
		log("[Error]: config file not found: " + CONFIG_FILE);
	}
});

// read in biat info
var biatConfig = {};
log('Reading in biat file: ' + BIAT_FILE);
fs.exists(BIAT_FILE, function(exists) {
  log('available biats:')
  biatsRaw = fs.readFileSync(BIAT_FILE);
  biatConfig = JSON.parse(biatsRaw);
  log(biatConfig);
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); 

app.use(function(req,res,next){
    req.biatConfig = biatConfig;
    next();
});

app.get('/', indexRouter);
app.post('/', indexRouter);

app.get('/tweets', tweetRouter.index);

app.get('/mturk', mturkRouter.index);
app.get('/mturk/thanks', mturkRouter.thanks);
app.get('/mturk/ocean', mturkRouter.ocean);
app.get('/mturk/grbs', mturkRouter.grbs);
app.get('/playground', playgroundRouter.index);
app.get('/biat/:biatKey', biatRouter.biat);
app.get('/biat', biatRouter.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;