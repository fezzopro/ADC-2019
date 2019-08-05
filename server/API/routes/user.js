const express = require("express");
const bcrypt = require("bcrypt");
const WayFarer = require("../../controller/wayfarer");
const BodyChecker = require("../../helpers/requestBodies");
const jwt = require("jsonwebtoken");
const route = express.Router();

// User Authentication Routes

// Login endpoint
route.post("/signin", (request, response, next) => {

    let results = BodyChecker.checkSignInBody(request.body);

    if (results.status) {
        
        let signinResponse = WayFarer.signin(request.body.username, request.body.password);

        if (signinResponse.hasOwnProperty("status")) {
            if (signinResponse.status === "success") {
                response.status(200).json(signinResponse);
            } else {
                response.status(401).json({ status: "failled", message: "Incorect Username Or Password" });
            }
        } else {
            response.status(401).json({ status: "failled", message: "Incorect Username Or Password" });
        }

    } else {
        response.status(200).json({ status: "Failed", message: "Fill All The Fields", data: results.data });
    }
    response.end();
});

// Create Account Endpoint
route.post("/signup", (request, response, next) => {

    bodyData = request.body;
    let results = BodyChecker.checkSignUpBody(bodyData);
    if (results.status) {
        // check if he/she already Exists
        if (WayFarer.userExist(bodyData.username)) {
            response.status(200).json({ status: "Failed", message: "User Already Exists" });
        } else {
            bodyData.email = bodyData.username;
            bodyData.password = bcrypt.hashSync(bodyData.password, bcrypt.genSaltSync(10));
            if (WayFarer.signup(bodyData)) {
                response.status(201).json({ status: "Success", data: bodyData });
            } else {
                response.status(200).json({ status: "Failed", message: "Unable To save Your account. Please try again later" });
            }
            response.end();
        }
    } else {
        response.status(401).json({ error: "Uncomplete or Empty data", data: results.data });
    }
    response.end();
});

module.exports = route;