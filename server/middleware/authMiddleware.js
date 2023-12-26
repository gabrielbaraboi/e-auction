const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.status(400).json({ message: "Token required!" });
	}
	try {
		const decoded = jwt.verify(token, config.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json({ message: "Invalid token!" });
	}
};

module.exports = {
	verifyToken,
};
