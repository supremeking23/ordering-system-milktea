module.exports = (app) => {
	const customers = require("../controllers/customer.controllers");

	//create mew customer
	app.post("/customers", customers.create);
	//get all customer
	app.get("/customers", customers.findAll);
	//get single customer
	app.get("/customers/:customerID", customers.findOne);

	//update single customer
	app.put("/customers/:customerID", customers.update);

	app.delete("/customers/:customerID", customers.delete);
};
