const Order = require("../models/order.model");
const OrderDetail = require("../models/orderDetail.model");
const mongoose = require("mongoose");

exports.create = async (req, res) => {
	// Create Order
	const order = new Order({
		status: req.body.status,
		customer: req.body.customerID,
		// _id: mongoose.Types.ObjectId(),
	});

	try {
		const data = await order.save();
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
		const data = await Order.find()
			// .select("order_date customer")
			.populate("customer");

		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating order data.",
		});
	}
};

exports.findOne = async (req, res) => {
	try {
		const data = await Order.findById(req.params.orderID).populate("customer");
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.orderID,
			});
		}

		const detail = await OrderDetail.find()
			.select("product quantity price")
			.where("order", req.params.orderID)
			.populate("product");

		res.send({ mainOrderDetail: data, orderItemDetails: detail });
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating order data.",
		});
	}
};

exports.update = async (req, res) => {
	const option = { new: true };
	const reqBody = {
		status: req.body.status,
	};

	try {
		const data = await Order.findByIdAndUpdate(
			req.params.orderID,
			reqBody,
			option
		);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.orderID,
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

exports.delete = async (req, res) => {
	try {
		const data = await Order.findByIdAndRemove(req.params.orderID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.orderID,
			});
		}

		const detail = await OrderDetail.remove().where(
			"order",
			req.params.orderID
		);
		res.send(data);
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).send({
				message: "Product not found with id " + req.params.orderID,
			});
		}
		return res.status(500).send({
			message: "Could not delete product with id " + req.params.orderID,
		});
	}
};
