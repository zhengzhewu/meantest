
/**
 * Module dependencies.
 */
var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');

/**
 * Initialize application middleware
 */
module.exports = function () {
	var app = express();
	
	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}
	
	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	
	
	app.use(methodOverride());
	
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));
	
	// views middleware
	app.set('views', './app/views');
	app.set('view engine', 'ejs');
	
	// Enable flase middleware
	app.use(flash());
	
	// passport and sessiong
	app.use(passport.initialize());
	app.use(passport.session());
	
//	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/customers.server.routes.js')(app);
	
	app.use(express.static('./public'));
	return app;
};