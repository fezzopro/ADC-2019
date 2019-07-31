const express = require("express");
const WayFarer = require("../../wayfarer");
const route = express.Router();

// trip routes

// Create trip
route.post("/",(req, res, next)=>{
    res.status(200).send(JSON.parse())
    res.end();
});

// Get all trips.
route.get("/",(req, res, next)=>{

});

// Get a specific trip.
route.get("/:trip_id",(req, res, next)=>{
    let trip_id = req.params.trip_id;

});

// Cancel a trip.
route.patch("/:trip_id/cancel",(req, res, next)=>{
    let trip_id = req.params.trip_id;

});

module.exports = route;
