module.exports = (app) => {
	// login
	const authenticate = require("../controllers/authenticate.controllers");

	app.post("/login", authenticate.login);
	app.post("/token", authenticate.token);
	app.delete("/logout", authenticate.delete);
};
