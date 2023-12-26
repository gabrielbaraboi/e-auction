const User = require("../models/User");
const utils = require("../utils/utils");

const register = async (req, res) => {
	try {
		const { email, firstName, lastName, password } = req.body;
		console.log(req.body);
		if (!(email && firstName && lastName && password)) {
			res.status(400).json({ message: "All input are required" });
		}

		if (await utils.isEmailTaken(email)) {
			return res.status(400).json({ message: "Email is already taken" });
		}

		await User.create({
			email,
			firstName,
			lastName,
			password: await utils.encryptPassword(password),
		});
		res.status(201).json({ message: "User created successfully!" });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Something went wrong! Register failed!",
		});
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!(email && password)) {
			res.status(400).json({ message: "All inputs are required" });
		}

		const user = await User.findOne({ email });

		if (user && (await utils.isValidPassword(user, password))) {
			const token = await utils.generateToken(user);

			const resUser = {
				id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				token,
			};

			res.status(200).json({
				message: "Login successful!",
				user: resUser,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Something went wrong! Login failed!",
		});
	}
};

const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({ message: "Get users successful!", users });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			message: "Something went wrong! Get users failed!",
		});
	}
};

module.exports = {
	register,
	login,
	getUsers,
};
