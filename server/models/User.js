const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true, minlength: 6 },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		role: {
			type: String,
			required: true,
			default: "user",
			enum: ["user", "admin"],
		},
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", UserSchema);
