/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var barbers = require('../../app/controllers/customers.server.controller');

module.exports = function (app) {
	app.route('/api/customers')
		.get(customers.list)
		.post(customers.create);
	app.route('/api/customers/:customerId')
		.get(customers.read)
		.put(customers.update)
		.delete(customers.delete);
	app.param('customerId', customers.customerByID);
};