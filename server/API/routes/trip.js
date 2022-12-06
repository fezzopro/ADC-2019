const express = require("express");
const checkAuth = require("../../middlewares/check-auth");
const trips = require("../../controller/trips");
const route = express.Router();



// trip routes

// Create trip
route.post("/", checkAuth, trips.create);

// Get all trips.
route.get("/", trips.viewAllTrip);

// Get a specific trip.
route.get("/:trip_id", trips.specificTrip);

// Cancel a trip.
route.patch("/:trip_id/cancel", checkAuth, trips.cancelTrip);

module.exports = route;
