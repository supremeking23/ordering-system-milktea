const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
	first_name: {
		type: String,
		required: true,
	},
	last_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	contact: {
		type: Number,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		required: true,
		unique: true,
	},
	house_number: {
		type: String,
		required: true,
	},
	street_address: {
		type: String,
		required: false,
	},
	city: {
		type: String,
		required: true,
	},
	state: {
		type: String,
		required: true,
	},
	zipcode: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Customer", CustomerSchema);

// https://mongoosejs.com/docs/validation.html
//https://mongoosejs.com/docs/schematypes.html
