const Feedback = require("../models/feedback.model");

exports.create = async (req, res) => {
	const feedback = new Feedback({
		feedback: req.body.feedback,
		rate: req.body.rate,
		image: req.body.image,
		customer: req.body.customerID,
		product: req.params.productID,
	});

	try {
		const data = await feedback.save();
		res.json(data);
	} catch (error) {
		res.status(500).send({
			message: error.message || "Some error occurred while creating  data.",
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		const data = await Feedback.find();
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message: error.message || "Some error occurred while creating  data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Feedback.findById(req.params.feedbackID)
			.populate("customer")
			.populate("product");
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.feedbackID,
			});
		}
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message: error.message || "Some error occurred while creating  data.",
		});
	}
};

// Update a customer identified by the customerID in the request
exports.update = async (req, res) => {
	const option = { new: true };
	const reqBody = {
		feedback: req.body.feedback,
		// rate: req.body.rate,
		// image: req.body.image,
		// customer: req.body.customerID,
		// product: req.params.productID,
	};

	// Find customer and update it with the request body
	try {
		const data = await Feedback.findByIdAndUpdate(
			req.params.feedbackID,
			reqBody,
			option
		);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.feedbackID,
			});
		}

		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating product data.",
		});
	}
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
	try {
		const data = await Feedback.findByIdAndRemove(req.params.feedbackID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.feedbackID,
			});
		}

		res.send(data);
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).send({
				message: "Product not found with id " + req.params.feedbackID,
			});
		}
		return res.status(500).send({
			message: "Could not delete product with id " + req.params.feedbackID,
		});
	}
};
