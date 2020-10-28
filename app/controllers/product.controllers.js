const Product = require("../models/product.model");

exports.create = async (req, res) => {
	// Create a Product
	const product = new Product({
		product_name: req.body.product_name,
		product_description: req.body.product_description,
		price: req.body.price,
		image: req.body.image,
	});

	try {
		const data = await product.save();
		res.json(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating product data.",
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		const data = await Product.find();
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating product data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Product.findById(req.params.productID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.productID,
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

// Update a customer identified by the customerID in the request
exports.update = async (req, res) => {
	const option = { new: true };
	const reqBody = {
        product_name: req.body.product_name,
		// product_description: req.body.product_description,
		// price: req.body.price,
		// image: req.body.image,
	};

	// Find customer and update it with the request body
	try {
		const data = await Product.findByIdAndUpdate(
			req.params.productID,
			reqBody,
			option
		);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.productID,
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
		const data = await Product.findByIdAndRemove(req.params.productID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.productID,
			});
		}

		res.send(data);
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).send({
				message: "Product not found with id " + req.params.productID,
			});
		}
		return res.status(500).send({
			message: "Could not delete product with id " + req.params.productID,
		});
	}
};