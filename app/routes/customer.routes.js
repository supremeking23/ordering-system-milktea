module.exports = (app) => {
	const customers = require("../controllers/customer.controllers");
	const auth = require("../controllers/authenticate.controllers");

	//create mew customer
	app.post("/customers", auth.authenticateToken, customers.create);
	//get all customer
	app.get("/customers", auth.authenticateToken, customers.findAll);
	//get single customer
	app.get("/customers/:customerID", auth.authenticateToken, customers.findOne);

	//update single customer
	app.put("/customers/:customerID", auth.authenticateToken, customers.update);

	app.delete(
		"/customers/:customerID",
		auth.authenticateToken,
		customers.delete
	);
};
