const express = require("express");
const WayFarer = require("../../controller/wayfarer");
const route = express.Router();
// route.use(express.json());

// User Authentication Routes

// Login endpoint
route.post("/signin",(request, response, next)=>{
    
    // response.status(200).send(request.body);
    
    if (WayFarer.signin(request.body.username, request.body.password)) {
        response.status(200).json(request.body);
    } else {
        response.status(200).send(request.body);
        console.log(request.params);
    }
    response.end();
});

// Create Account Endpoint
route.post("/signup",(request, response, next)=>{
    let user = {"userID": 5};
    if (request.body !=={}) {
        response.status(201).json({"status":"success","data":WayFarer.signup((request.body))});
    }else{
        response.status(401).json({"message":"Empty data"});
    }
    response.end();
});

module.exports = route;