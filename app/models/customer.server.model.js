/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
/**
 * Customer Schema
 */
var CustomerSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: false,
		required: 'Name cannot be blank'
	},
	email: {
		type: String,
		default: '',
		trim: true
	},
	prefbarber: {
		type: String,
		default: '',
		trim: false
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});
mongoose.model('Customer', CustomerSchema);
