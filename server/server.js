require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const server = app.listen(process.env.PORT || 3001, () => {
	console.log("Server is running on port: " + process.env.PORT || 3001);
});

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);
app.use(bodyParser.json());
app.use(express.json());

module.exports = app;
