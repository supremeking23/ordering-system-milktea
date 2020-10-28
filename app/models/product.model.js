const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
	product_name: {
		type: String,
		required: true,
	},
	product_description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
		unique: true,
	},
});

module.exports = mongoose.model("Product", ProductSchema);

// https://mongoosejs.com/docs/validation.html
//https://mongoosejs.com/docs/schematypes.html
