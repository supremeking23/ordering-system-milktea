module.exports = (app) => {
	const orders = require("../controllers/order.controllers");

	app.post("/orders", orders.create);

	app.get("/orders", orders.findAll);

	app.get("/orders/:orderID", orders.findOne);

	app.put("/orders/:orderID", orders.update);

	app.delete("/orders/:orderID", orders.delete);
};
