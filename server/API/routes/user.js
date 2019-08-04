const express = require("express");
const WayFarer = require("../../controller/wayfarer");
const BodyChecker = require("../../helpers/requestBodies")
const route = express.Router();
// route.use(express.json());

// User Authentication Routes

// Login endpoint
route.post("/signin",(request, response, next)=>{
    
    let results = BodyChecker.checkSignInBody(request.body);
    
    if (results.status) {
        let signinResponse = WayFarer.signin(request.body.username, request.body.password);
        
        if (signinResponse.hasOwnProperty("status")) {
            if (signinResponse.status === "success") {
                response.status(200).json(signinResponse);
            }else{
                response.status(401).json({status:"failled", message: "Incorect Username Or Password"});
            }
        }else{
            response.status(401).json({status:"failled", message: "Incorect Username Or Password"});
        }

    } else {
        response.status(200).json({status:"Failed",message:"Fill All The Fields", data:results.data});
    }
    response.end();
});

// Create Account Endpoint
route.post("/signup",(request, response, next)=>{
    let user = {"userID": 5};
    let results = BodyChecker.checkSignUpBody(request.body);
    if (results.status) {
        // check if he/she already Exists
        if(WayFarer.userExist(request.body.username)){
            response.status(200).json({status:"Failed", message:"User Already Exists"});
        }else{
            if (WayFarer.signup(request.body)) {
                response.status(201).json({status:"success",data: request.body});
            } else {
                response.status(201).json({status:"Failed",message: "Unable To save Your account. Please try again later"});
            }
        }
    }else{
        response.status(401).json({error: "Uncomplete or Empty data",data:results.data});
    }
    response.end();
});

module.exports = route;