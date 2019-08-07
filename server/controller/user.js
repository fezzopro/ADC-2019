
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const WayFarer = require("../controller/wayfarer");
const BodyChecker = require("../helpers/requestBodies");

let signin = (request, response, next) => {

    let results = BodyChecker.checkSignInBody(request.body);

    if (results.status) {

        let signinResponse = WayFarer.signin(request.body.username, request.body.password);

        if (signinResponse.hasOwnProperty("status")) {
            if (signinResponse.status === "success") {
                let token = jwt.sign({
                    names: signinResponse.data.first_name + ' ' + signinResponse.data.last_name,
                    is_admin: signinResponse.data.is_admin,
                    random_reference: signinResponse.random_reference,
                    id: signinResponse.data.id
                },
                    process.env.JWT_KEY,
                    { expiresIn: "1h" });
                response.status(200).json({ signinResponse, token });
            } else {
                // Unauthorized 
                response.status(401).json({ status: "failled", message: "Incorect Username Or Password" });
            }
        } else {
            response.status(401).json({ status: "failled", message: "Incorect Username Or Password" });
        }

    } else {
        response.status(200).json({ status: "Failed", message: "Fill All The Fields", data: results.data });
    }
    response.end();
};

let signup = (request, response, next) => {

    bodyData = request.body;
    let results = BodyChecker.checkSignUpBody(bodyData);
    if (results.status) {
        // check if he/she already Exists
        if (WayFarer.userExist(bodyData.username)) {
            response.status(409).json({ status: "Failed", message: "User Already Exists" });
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
};

module.exports = { signin, signup };