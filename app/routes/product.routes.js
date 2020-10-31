module.exports = (app) => {
	const products = require("../controllers/product.controllers");
	const auth = require("../controllers/authenticate.controllers");

	//create mew product
	app.post("/products", auth.authenticateToken, products.create);
	//get all product
	app.get("/products", auth.authenticateToken, products.findAll);
	//get single product
	app.get("/products/:productID", auth.authenticateToken, products.findOne);

	//update single product
	app.put("/products/:productID", auth.authenticateToken, products.update);
	//delete single product
	app.delete("/products/:productID", auth.authenticateToken, products.delete);
};
