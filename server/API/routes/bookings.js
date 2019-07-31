const fs = require("fs");
const path = require("path");
const express = require("express");
const WayFarer = require("../../wayfarer");
const route = express.Router();

// Book a seat on a trip

route.post("/", (req, res, next)=>{

})

// View all bookings. An Admin can see all bookings, while user can see all of his/her bookings.

route.get("/", (req, res, next)=>{
    // let fileContent = fs.readFileSync( path.join(__dirname,"./../../data.json"));
    // res.status(200).send(JSON.parse(fileContent));
    // console.log(fileContent);
    let fileContent;
    fs.readFile(path.join(__dirname,"./../../data.json"),(error, data_)=>{
        if (error) throw error;
        fileContent = JSON.parse(data_)
        res.status(200).json(fileContent[0].users_1.username);
        console.log(fileContent);
    });
})

// Delete a booking.

route.delete("/:booking_id", (req, res, next)=>{
    let booking_id = req.params.booking_id;

})

module.exports = route;