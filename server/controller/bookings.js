const WayFarer = require("../controller/wayfarer");


    let create = (request, response, next) => {
        let results = WayFarer.BookTrip(request.userData, request.body.trip_id);
        response.status(results.status).json(results)
        
    };

let viewAll = (request, response, next) => {

    let fileContent = WayFarer.viewBooking(request.userData);
    if (fileContent.data.length > 0) {
        // Set Content Found status
        response.status(302).json(fileContent);
    } else {
        // No content status
        response.status(404).json(fileContent);
    }
};

let specificBooking = (request, response, next) => {
    let fileContent = WayFarer.viewBooking(request.userData, request.params.booking_id);
    if (fileContent.data.length > 0) {
        // Set Content Found status
        response.status(302).json(fileContent);
    } else {
        // No content status
        response.status(404).json(fileContent);
    }
};

let deleteBooking = (request, response, next) => {

    let results = WayFarer.deleteBooking(request.userData, request.params.booking_id);

    response.status(results.status).json(results);
};

module.exports = { viewAll, specificBooking, deleteBooking, create };