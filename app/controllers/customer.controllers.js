const Customer = require("../models/customer.model");

// Create and Save a new Customer
exports.create = async (req, res) => {
	// Create a Customer
	const customer = new Customer({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email,
		contact: req.body.contact,
		image: req.body.image,
		house_number: req.body.house_number,
		street_address: req.body.street_address,
		city: req.body.city,
		state: req.body.state,
		zipcode: req.body.zipcode,
		// first_name: "sample name",
		// last_name: "sample last",
		// email: "sample@email.com",
		// contact: "098111111",
		// image: "image-path",
		// house_number: "9999",
		// street_address: "req.body.street_address",
		// city: "req.body.city",
		// state: "eq.body.state",
		// zipcode: "9999",
	});

	// Save Customer in the database
	// customer
	// 	.save()
	// 	.then((data) => {
	// 		res.send(data);
	// 	})
	// 	.catch((err) => {
	// 		res.status(500).send({
	// 			message: err.message || "Some error occurred while creating the Note.",
	// 		});
	// 	});

	try {
		const data = await customer.save();
		res.json(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		const data = await Customer.find();
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Customer.findById(req.params.customerID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.customerID,
			});
		}
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

// Update a customer identified by the customerID in the request
exports.update = async (req, res) => {
	const option = { new: true };
	const reqBody = {
		first_name: req.body.first_name,
		// last_name: req.body.last_name,
		// email: req.body.email,
		// contact: req.body.contact,
		// image: req.body.image,
		// house_number: req.body.house_number,
		// street_address: req.body.street_address,
		// city: req.body.city,
		// state: req.body.state,
		// zipcode: req.body.zipcode,
	};

	// Find customer and update it with the request body
	try {
		const data = await Customer.findByIdAndUpdate(
			req.params.customerID,
			reqBody,
			option
		);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.customerID,
			});
		}

		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating customer data.",
		});
	}
};

// Delete a note with the specified noteId in the request
exports.delete = async (req, res) => {
	try {
		const data = await Customer.findByIdAndRemove(req.params.customerID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.customerID,
			});
		}

		res.send(data);
	} catch (error) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).send({
				message: "Customer not found with id " + req.params.customerID,
			});
		}
		return res.status(500).send({
			message: "Could not delete customer with id " + req.params.customerID,
		});
	}
};

// .then((note) => {
// 	if (!note) {
// 		return res.status(404).send({
// 			message: "Note not found with id " + req.params.noteId,
// 		});
// 	}
// 	res.send({ message: "Note deleted successfully!" });
// })
// .catch((err) => {
// 	if (err.kind === "ObjectId" || err.name === "NotFound") {
// 		return res.status(404).send({
// 			message: "Note not found with id " + req.params.noteId,
// 		});
// 	}
// 	return res.status(500).send({
// 		message: "Could not delete note with id " + req.params.noteId,
// 	});
// });
