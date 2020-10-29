module.exports = (app) => {
	const orderDetail = require("../controllers/orderDetail.controllers");

	//create mew orderDetail
	app.post("/orderDetail/:orderID", orderDetail.create);

	//testing purpose
	app.get("/orderDetail/", orderDetail.findAll);

	// //update single customer
	// app.put("/orders/:orderID", orders.update);

	// app.delete("/orders/:orderID", orders.delete);
};
