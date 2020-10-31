module.exports = (app) => {
	const orders = require("../controllers/order.controllers");
	const auth = require("../controllers/authenticate.controllers");

	app.post("/orders", auth.authenticateToken, orders.create);

	app.get("/orders", auth.authenticateToken, orders.findAll);

	app.get("/orders/:orderID", auth.authenticateToken, orders.findOne);

	app.put("/orders/:orderID", auth.authenticateToken, orders.update);

	app.delete("/orders/:orderID", auth.authenticateToken, orders.delete);
};
