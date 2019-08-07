const express = require("express");
const WayFarer = require("../../controller/wayfarer");
// const BodyChecker = require("../../helpers/requestBodies");
const user = require("../../controller/user");
const route = express.Router();

// User Authentication Routes

// Login endpoint
route.post("/signin", user.signin);

// Create Account Endpoint
route.post("/signup", user.signup);

module.exports = route;