'use strict';

/**
 * Module dependencies.
 */
var config = require('./config'),
	mongoose = require('mongoose');

// Initialize Mongoose
module.exports = function () {
	var db = mongoose.connect(config.db);
	require('../app/models/customer.server.model');
	return db;
};
