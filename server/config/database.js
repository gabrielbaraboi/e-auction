const mongoose = require("mongoose");

const { MONGO_URL } = process.env;
mongoose.set("returnOriginal", false);
exports.connect = () => {
	// Connecting to the database
	mongoose
		.connect(MONGO_URL)
		.then(() => {
			console.log("Successfully connected to database");
		})
		.catch((error) => {
			console.log("database connection failed. exiting now...");
			console.error(error);
			process.exit(1);
		});
};
