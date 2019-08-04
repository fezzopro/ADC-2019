const express = require("express");
const WayFarer = require("../../controller/wayfarer");
const route = express.Router();
// route.use(express.json());
// Book a seat on a trip

route.post("/", (req, res, next)=>{

})

// View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.

route.get("/", (req, res, next)=>{
    let fileContent = WayFarer.viewBooking(1);
    res.status(200).json(fileContent);
})

// Get A Specific Booking Informations
route.get("/:booking_id", (req, res, next)=>{
    let fileContent = WayFarer.viewBooking(1,req.params.booking_id);
    res.status(200).json(fileContent);
})

// Delete a booking.

route.delete("/:booking_id", (req, res, next)=>{
    let booking_id = req.params.booking_id;
})

module.exports = route;