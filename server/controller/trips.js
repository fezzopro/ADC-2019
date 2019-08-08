const WayFarer = require("../controller/wayfarer");
const BodyChecker = require("../helpers/requestBodies");

let create = (request, response, next) => {
    let results = BodyChecker.checkCreateTripBody(request.body);
    if (request.userData.is_admin) {
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

    } else {
        return response.status(401).json({
            status: 401,
            message: "anuthorized Action"
        });
    }

    response.end();
};

let viewAllTrip = (request, response, next) => {
    let trips = WayFarer.viewTrip();
    response.status(trips.status).json(trips);
};

let specificTrip = (request, response, next) => {
    let trip_id = request.params.trip_id;
    // let user_id = request.userData.id;

    if (isNaN(trip_id)) {
        response.status(400).json({ status: 400, error: "Id should be an integer" })
    } else {
        let trips = WayFarer.viewTrip(trip_id);
        if (trips.length > 0) {
            response.status(302).json({ status: 302, message: "Data found", data: trips });

        } else {
            response.status(404).json({ status: 404, message: "Empty Results", data: trips });
        }

    }
};
let cancelTrip = (req, res, next) => {
    let trip_id = req.params.trip_id;
    res.json({ status: 404, "message": "Nothing Yey" });
}
module.exports = { create, viewAllTrip, specificTrip, cancelTrip };