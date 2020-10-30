const mongoose = require("mongoose");

const AuthenticateSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,

	username: {
		type: String,
	},
	user_type: {
		type: String,
		enum: ["admin", "customer"],
	},

	user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Customer" }],
});

module.exports = mongoose.model("Authenticate", AuthenticateSchema);
