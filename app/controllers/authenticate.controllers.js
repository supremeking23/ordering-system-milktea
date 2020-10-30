//jsonwebtoken
const jwt = require("jsonwebtoken");
const Authenticate = require("../models/authenticate.model");
let refreshTokens = [];

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1];
	if (token == null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		console.log(err);
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
};

const generateAccessToken = (user) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "25s" });
};

exports.login = (req, res) => {
	const username = req.body.username;
	const user = { name: username };
	const accessToken = generateAccessToken(user);
	const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
	refreshTokens.push(refreshToken);
	res.json({ accessToken: accessToken, refreshToken: refreshToken });
};

exports.delete = (req, res) => {
	refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
	res.sendStatus(204);
};

exports.token = (req, res) => {
	//dapat naka store sa db ung refresh tokens
	const refreshToken = req.body.token;
	if (refreshToken == null) return res.sendStatus(401);
	if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

	jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403);
		const accessToken = generateAccessToken({ name: user.name });
		res.json({ accessToken: accessToken });
	});
};
