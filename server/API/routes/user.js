const express = require("express");
const WayFarer = require("../../wayfarer");
const route = express.Router();
route.use(express.json());

// User Authentication Routes

// Login endpoint
route.post("/signin",(request, response, next)=>{
    response.json(({moning:response.body}));
    if (WayFarer.signin(request.body.username, request.body.password)) {
    //     response.status(200).json({resp:"'greate'"});
    //     console.log(request.params);

    } else {
    //     response.status(200).send(request.body);
    //     console.log(request.params);
    }
    response.end();
});

// Create Account Endpoint
route.post("/signup",(request, response, next)=>{
    let user = {"userID": 5}
    if (request.body !=={}) {
        console.log(WayFarer.signup((request.body)));
    }
    response.status(200).json({"status":"success","data":JSON.stringify(request.body)});
    response.end();
});

module.exports = route;