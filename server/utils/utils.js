const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = process.env;

const isEmailTaken = async (email) => {
	const user = await User.findOne({ email });
	return user ? true : false;
};

const encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const generateToken = async (user) => {
	const { _id } = user;
	const token = jwt.sign({ _id }, config.JWT_SECRET, {
		expiresIn: "1h",
	});
	return token;
};

const isValidPassword = async (user, password) => {
	return await bcrypt.compare(password, user.password);
};

module.exports = {
	isEmailTaken,
	encryptPassword,
	generateToken,
	isValidPassword,
};
