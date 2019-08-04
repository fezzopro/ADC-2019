const express = require("express");
const WayFarer = require("../../controller/wayfarer");
const route = express.Router();


// route.use(express.json());

// trip routes

// Create trip
route.post("/",(req, res, next)=>{
    res.status(201).json({status:"Success", data: req.body})
    res.end();
});

// Get all trips.
route.get("/",(req, res, next)=>{
    let trips = WayFarer.viewTrip(1);
    res.status(200).json(trips);
});

// Get a specific trip.
route.get("/:trip_id",(req, res, next)=>{
    let trip_id = req.params.trip_id;
    
    let trips = WayFarer.viewTrip(1,trip_id);
    res.status(200).json(trips);

});

// Cancel a trip.
route.patch("/:trip_id/cancel",(req, res, next)=>{
    let trip_id = req.params.trip_id;
    res.json({"message": "Nothing Yey"});
});

module.exports = route;
