module.exports = (app) => {
	const feedbacks = require("../controllers/feedback.controllers");
	const auth = require("../controllers/authenticate.controllers");

	//create mew customer
	app.post("/:productID/feedback", auth.authenticateToken, feedbacks.create);
	//get all customer
	app.get("/:productID/feedback", auth.authenticateToken, feedbacks.findAll);
	//get single customer
	app.get(
		"/:productID/feedback/:feedbackID",
		auth.authenticateToken,
		feedbacks.findOne
	);

	//update single customer
	app.put(
		"/:productID/feedback/:feedbackID",
		auth.authenticateToken,
		feedbacks.update
	);

	app.delete(
		"/:productID/feedback/:feedbackID",
		auth.authenticateToken,
		feedbacks.delete
	);
};
