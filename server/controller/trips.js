const WayFarer = require("../controller/wayfarer");
const BodyChecker = require("../helpers/requestBodies");

let create = (request, response, next) => {
    let results = BodyChecker.checkCreateTripBody(request.body);
    if (results.status) {
        // check if a trip already Exists
        if (WayFarer.tripExist(request.body)) {
            response.status(409).json({ status: 409, message: "Trip Already Exists" });
        } else {
            if (WayFarer.createTrip(request.body, request.userData.id)) {
                response.status(201).json({ status: 201, data: request.body });
            } else {
                response.status(201).json({ status: 200, message: "Unable To save Your trip. Please try again later" });
            }
        }
    } else {
        response.status(401).json({ status: 401, error: "Incomplete or Empty data", data: results.data });
    }
    response.end();
};

let viewAllTrip = (request, response, next) => {
    let trips = WayFarer.viewTrip(request.userData.id);
    response.status(200).json(trips);
};

let specificTrip = (request, response, next)=>{
    let trip_id = request.params.trip_id;
    let user_id = request.userData.id;
    
    let trips = WayFarer.viewTrip(user_id,trip_id);
    if (trips.data.length > 0) {
        response.status(302).json(trips);
        
    } else {
        response.status(404).json({trips});
        
    }

};

module.exports = { create, viewAllTrip, specificTrip };