module.exports = (app) => {
	const customers = require("../controllers/customer.controllers");
	const auth = require("../controllers/authenticate.controllers");

	//create mew customer
	app.post("/customers", customers.create);
	//get all customer
	app.get("/customers", auth.authenticateToken, customers.findAll);
	//get single customer
	app.get("/customers/:customerID", customers.findOne);

	//update single customer
	app.put("/customers/:customerID", customers.update);

	app.delete("/customers/:customerID", customers.delete);
};
