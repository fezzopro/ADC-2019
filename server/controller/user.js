
const bcrypt = require("bcrypt");
const WayFarer = require("../controller/wayfarer");
const BodyChecker = require("../helpers/requestBodies");
const tokenized = require("../helpers/generateToken");

let signin = (request, response, next) => {

    let results = BodyChecker.checkSignInBody(request.body);

    if (results.status) {

        let signinResponse = WayFarer.signin(request.body.username, request.body.password);

        if (signinResponse.hasOwnProperty("status")) {
            if (signinResponse.status === "success") {
                let token = tokenized(signinResponse);
                response.status(200).json({ status:200, signinResponse, token });
            } else {
                // Unauthorized 
                response.status(401).json({ status: 401, message: "Incorect Username Or Password" });
            }
        } else {
            response.status(401).json({ status: 401, message: "Incorect Username Or Password" });
        }

    } else {
        response.status(200).json({ status: 200, message: "Fill All The Fields", data: results.data });
    }
    response.end();
};

let signup = (request, response, next) => {

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

                let token = tokenized({data:bodyData});
                // response.status(200).json({ signinResponse, token });

                bodyData.token = token;
                // bodyData.remove("password");
                // bodyData.remove("random_reference");
                let {password,random_reference, ...data} =bodyData;
                
                response.status(201).json({ status: 201, message:"Your Account has been Created successfully", data: data });
            } else {
                response.status(200).json({ status: 200, message: "Unable To save Your account. Please try again later" });
            }
            response.end();
        }
    } else {
        response.status(401).json({ status:401,data: results.data });
    }
    response.end();
};

module.exports = { signin, signup };