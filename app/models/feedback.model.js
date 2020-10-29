const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	date: { type: Date, default: Date.now },
	feedback: {
		type: String,
		required: false,
	},
	rate: {
		type: Number,
		required: true,
		min: 0,
		max: 10,
	},
	image: {
		type: String,
		required: false,
	},
	customer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
	product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Feedback", FeedbackSchema);
