const mongoose = require("mongoose");

const OrderDetailSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	order: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
	product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("OrderDetail", OrderDetailSchema);
