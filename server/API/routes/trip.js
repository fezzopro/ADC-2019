const express = require("express");
const checkAuth = require("../../middlewares/check-auth");
const trips = require("../../controller/trips");
const route = express.Router();



// trip routes

// Create trip
route.post("/",checkAuth, trips.create);

// Get all trips.
route.get("/",checkAuth, trips.viewAllTrip);

// Get a specific trip.
route.get("/:trip_id",checkAuth, trips.specificTrip);

// Cancel a trip.
route.patch("/:trip_id/cancel",(req, res, next)=>{
    let trip_id = req.params.trip_id;
    res.json({status:404, "message": "Nothing Yey"});
});

module.exports = route;
