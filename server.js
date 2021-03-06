require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

var cors = require("cors");

// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
	.connect(dbConfig.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

// define a simple route
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to Miltank's Milktea.",
	});
});

// Require Customer routes
require("./app/routes/customer.routes")(app);
// Require Product routes
require("./app/routes/product.routes")(app);
// Require Order routes
require("./app/routes/order.routes")(app);
// Require Order routes
require("./app/routes/orderDetail.routes")(app);
// Require Feedback routes
require("./app/routes/feedback.routes")(app);

require("./app/routes/authenticate.routes")(app);

// console.log(`date now ${Date.now}`);

// listen for requests
let port = process.env.PORT;
if (port == null || port == "") {
	port = 3000;
}
//app.listen(port);

app.listen(port, () => {
	console.log("Server is listening on port 3000");
});
