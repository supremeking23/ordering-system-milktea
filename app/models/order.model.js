const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	order_date: { type: Date, default: Date.now },
	status: {
		type: String,
		enum: ["for delivery", "done", "cancelled"],
		required: true,
	},
	customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
});

module.exports = mongoose.model("Order", OrderSchema);
