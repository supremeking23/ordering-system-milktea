module.exports = (app) => {
	const feedbacks = require("../controllers/feedback.controllers");

	//create mew customer
	app.post("/:productID/feedback", feedbacks.create);
	//get all customer
	app.get("/:productID/feedback", feedbacks.findAll);
	//get single customer
	app.get("/:productID/feedback/:feedbackID", feedbacks.findOne);

	//update single customer
	app.put("/:productID/feedback/:feedbackID", feedbacks.update);

	app.delete("/:productID/feedback/:feedbackID", feedbacks.delete);
};
