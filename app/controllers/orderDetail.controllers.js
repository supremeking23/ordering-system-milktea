const OrderDetail = require("../models/orderDetail.model");
const Order = require("../models/order.model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

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
			// .populate("product")
			// .populate("order")
			.where("order", req.params.orderID);

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
		const data = await OrderDetail.findById(req.params.orderDetailID)
			.populate("order")
			.populate("product")
			.where("order", req.params.orderID);
		if (!data) {
			return res.status(404).send({
				message: "record not found with id " + req.params.orderDetailID,
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

exports.update = async (req, res) => {
	const option = { new: true };
	const reqBody = {
		quantity: req.body.quantity,
		price: req.body.price,
	};

	try {
		const data = await OrderDetail.findByIdAndUpdate(
			req.params.orderDetailID,
			reqBody,
			option
		);
		if (!data) {
			return res.status(404).send({
				message: "record not Record with id " + req.params.orderDetailID,
			});
		}

		res.send(data);
	} catch (error) {
		res.status(500).send({
			message:
				error.message || "Some error occurred while creating Record data.",
		});
	}
};

exports.delete = async (req, res) => {
	try {
		const data = await OrderDetail.findByIdAndRemove(req.params.orderDetailID);
		if (!data) {
			return res.status(404).send({
				message: "Record not found with id " + req.params.orderDetailID,
			});
		}

		res.send(data);
	} catch (err) {
		if (err.kind === "ObjectId" || err.name === "NotFound") {
			return res.status(404).send({
				message: "Record not found with id " + req.params.orderDetailID,
			});
		}
		return res.status(500).send({
			message: "Could not delete Record with id " + req.params.orderDetailID,
		});
	}
};
