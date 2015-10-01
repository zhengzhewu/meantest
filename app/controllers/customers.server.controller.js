/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Customer = mongoose.model('Customer');

/**
 * Mongoose Error Handling
 * @param {type} err
 * @returns {String}
 */
var getErrorMessage = function (err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message)
				return err.errors[errName].
					message;
		}
	} else {
		return 'Unknown server error';
	}
};

/**
 * Create a customer
 */
exports.create = function (req, res) {
	var customer = new Customer(req.customer);
	Customer.find().exec(function (err, customer) {
		if (err)
			return next(err);
		if (customer.email)
			return next(new Error('Aleay exist customer eamil'));
	});
	customer.name = req.customer.name;
	customer.email = req.customer.email;
	customer.prefbarber = req.customer.prefbarber;
	customer.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};

/**
 * List a customer
 */
exports.list = function (req, res) {
	Customer.find().sort('-created').populate('creator', 'Name').exec(function (err, customers) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(customers);
		}
	});
};

/**
 * Customer middleware
 */
exports.customerByID = function (req, res, next, id) {
	Customer.findById(id).populate('customer', 'Name').exec(function (err, customer) {
		if (err)
			return next(err);
		if (!customer)
			return next(new Error('Failed to load customer ' + id));
		req.customer = customer;
		next();
	});
};

/**
 * Show the current customer
 */
exports.read = function (req, res) {
	res.json(req.customer);
};

/**
 * Update a customer
 */
exports.update = function (req, res) {
	var customer = req.customer;
	customer.name = req.customer.name;
	customer.email = req.customer.email;
	customer.prefbarber = req.customer.prefbarber;
	customer.save(function (err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};

/**
 * Delete a customer
 */
exports.delete = function (req, res) {
	var customer = req.customer;
	article.remove(function (err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(customer);
		}
	});
};


