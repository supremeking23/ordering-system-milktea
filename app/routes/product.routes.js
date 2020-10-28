module.exports = (app) => {
	const products = require("../controllers/product.controllers");

	//create mew product
	app.post("/products", products.create);
	//get all product
	app.get("/products", products.findAll);
	//get single product
	app.get("/products/:productID", products.findOne);

	//update single product
	app.put("/products/:productID", products.update);
	//delete single product
	app.delete("/products/:productID", products.delete);
};
