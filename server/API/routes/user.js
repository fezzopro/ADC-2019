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
                let token = jwt.sign({
                    username: signinResponse.data.username,
                    is_admin: signinResponse.data.is_admin,
                    random_reference: signinResponse.random_reference,
                    id: signinResponse.data.id
                },
                    process.env.JWT_KEY|| "SECRET",
                    { expiresIn: "1h" });
                    signinResponse.status = 200;
                    signinResponse.token = token;
                response.status(200).json(signinResponse);
            } else {
                // Unauthorized 
                response.status(401).json({ status: 401, message: "Incorect Username Or Password" });
            }
        } else {
            response.status(401).json({ status: 401, message: "Incorect Username Or Password" });
        }

    } else {
        response.status(200).json({ status: 422, message: "Fill All The Fields", data: results.data });
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
            response.status(409).json({ status: 409, message: "User Already Exists" });
        } else {
            bodyData.email = bodyData.username;
            bodyData.password = bcrypt.hashSync(bodyData.password, bcrypt.genSaltSync(10));
            if (WayFarer.signup(bodyData)) {
                response.status(201).json({ status: 201, data: bodyData });
            } else {
                response.status(200).json({ status: 200, message: "Unable To save Your account. Please try again later" });
            }
            response.end();
        }
    } else {
        response.status(401).json({status:401, error: "Uncomplete or Empty data", data: results.data });
    }
    response.end();
});

module.exports = route;