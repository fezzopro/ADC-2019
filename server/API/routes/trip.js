const express = require("express");
const WayFarer = require("../../controller/wayfarer");
const BodyChecker = require("../../helpers/requestBodies");
const route = express.Router();



// trip routes

// Create trip
route.post("/",(request, response, next)=>{

    let results = BodyChecker.checkCreateTripBody(request.body);
    if (results.status) {
        // check if a trip already Exists
        if(WayFarer.tripExist(request.body)){
            response.status(409).json({status:409, message:"Trip Already Exists"});
        }else{
            if (WayFarer.createTrip(request.body)) {
                response.status(201).json({status:201,data: request.body});
            } else {
                response.status(201).json({status:200,message: "Unable To save Your trip. Please try again later"});
            }
        }
    }else{
        response.status(401).json({status:401, error: "Incomplete or Empty data",data:results.data});
    }
    response.end();
});

// Get all trips.
route.get("/",(request, response, next)=>{
    let trips = WayFarer.viewTrip(1);
    response.status(200).json(trips);
});

// Get a specific trip.
route.get("/:trip_id",(request, response, next)=>{
    let trip_id = request.params.trip_id;
    
    let trips = WayFarer.viewTrip(1,trip_id);
    if (trips.data.length > 0) {
        response.status(302).json(trips);
        
    } else {
        response.status(204).json(trips);
        
    }

});

// Cancel a trip.
route.patch("/:trip_id/cancel",(req, res, next)=>{
    let trip_id = req.params.trip_id;
    res.json({"message": "Nothing Yey"});
});

module.exports = route;
