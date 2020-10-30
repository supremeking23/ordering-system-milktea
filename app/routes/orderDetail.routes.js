module.exports = (app) => {
	const orderDetail = require("../controllers/orderDetail.controllers");

	//create mew orderDetail
	app.post("/orderDetail/:orderID", orderDetail.create);

	//kahit wag na gamitin to
	app.get("/orders/:orderID/", orderDetail.findAll);

	app.get("/orders/:orderID/:orderDetailID", orderDetail.findOne);
	app.put("/orders/:orderID/:orderDetailID", orderDetail.update);

	app.delete("/orders/:orderID/:orderDetailID", orderDetail.delete);
};
