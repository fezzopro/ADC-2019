const express = require("express");
const checkAuth = require("../../middlewares/check-auth");
const bookings = require("../../controller/bookings");
const route = express.Router();

// Book a seat on a trip

route.post("/",checkAuth, bookings.create);

// View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.

route.get("/", checkAuth, bookings.viewAll);

// Get A Specific Booking Informations
route.get("/:booking_id", checkAuth, bookings.specificBooking );

// Delete a booking.

route.delete("/:booking_id",checkAuth, bookings.deleteBooking );

module.exports = route;