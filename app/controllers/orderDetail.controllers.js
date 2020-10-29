const OrderDetail = require("../models/orderDetail.model");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
	// Create Order
	const orderDetail = new OrderDetail({
		quantity: req.body.quantity,
		price: req.body.price,
		order: req.params.orderID,
		product: req.body.productID,
		// _id: mongoose.Types.ObjectId(),
	});

	try {
		const data = await orderDetail.save();
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
		const data = await OrderDetail.find()
			// .select("order_date customer")
			.populate("product")
			.populate("order");

		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating order data.",
		});
	}
};

//ALL THE CODES BELOW WERE NOT USE
exports.findOne = async (req, res) => {
	try {
		const data = await OrderDetail.findById(req.params.orderDetailID).populate(
			"customer"
		);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.OrderDetailID,
			});
		}
		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating order data.",
		});
	}
};
