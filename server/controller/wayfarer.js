const ID = Symbol('userId');
const fileLocation = Symbol('fileLocation');
const fileContent = Symbol('fileContent');
const fs = Symbol('fs');
const path = Symbol('path');
const Helper = Symbol('Helper');
const bcrypt = Symbol('bcrypt');
class WayFarer {
    constructor() {
        this[fs] = require("fs");
        this[path] = require("path");
        this[fileLocation] = this[path].join(__dirname, "../models/data.json");
        this[Helper] = require("../helpers/helper");
        this[bcrypt] = require("bcrypt");
        this[ID] = null;
        this.tripID = null;
        this.bookingId = null;
        this[fileContent] = [];
        this[fs].readFile(this[fileLocation], (error, data_) => {
            if (error) throw error;
            this[fileContent] = JSON.parse(data_)
        });
    }
    getDataContent() {
        return this[fileContent];
    }
    signin(username, password) {
        let userData = {};

        this[fileContent].users.map((user) => {
            if (user.status === 'active' && user.username === username && this[bcrypt].compareSync(password, user.password)) {
                userData.status = "success";
                userData.data = user;
            }
        });

        return userData;
    }
    signup(data) {
        let result = true;
        // Get All Available Users
        let allUsers = this[fileContent].users;
        // Change data id to be the next inline
        data.id = allUsers.length + 1;
        data.random_reference = this[Helper].randomString();
        // Push our signup object to the array
        this[fileContent].users.push(data);
        // Write to the file information abaout the user
        this[fs].writeFileSync(this[fileLocation], JSON.stringify(this[fileContent]), 'utf8', (error) => {
            if (error) {
                result = false;
                console.log(error);
                throw error;
            }
        });
        return result;
    }
    userExist(username) {
        let results = false;
        this[fileContent].users.map(individualUser => {

            if (individualUser.username === username) {
                results = true;
            }
        });
        return results;
    }
    tripExist(body) {
        let results = false;
        this[fileContent].trips.map(individualtrip => {
            if (individualtrip.bus_license_number === body.bus_license_number &&
                individualtrip.origin === body.origin &&
                individualtrip.destination === body.destination &&
                individualtrip.trip_date === body.trip_date
            ) {
                results = true;
            }
        });
        return results;
    }
    createTrip(data, user_id) {
        // Write on the file information about the trip

        let result = true;
        let allTrips = this[fileContent].trips;
        data.id = allTrips.length + 1;
        data.random_reference = this[Helper].randomString();
        data.user_id = user_id;
        this[fileContent].trips.push(data);
        this[fs].writeFileSync(this[fileLocation], JSON.stringify(this[fileContent]), 'utf8', (error) => {
            if (!error) {
                result = true;
            } else {
                result = false;
                console.log(error);
                throw error;
            }
        });
        return result;
    }
    cancelTrip(userId = this.userId, tripId) {
        // 
    }
    viewTrip(tripId = 'all') {
        if (tripId === 'all') {
            let allTripsObject = [];
            this[fileContent].trips.map(singleTrip => {

                if (singleTrip.status === 'Active')
                    allTripsObject.push(singleTrip);
            });
            if (allTripsObject.length > 0) {
                return { status: 302, message: "success", data: allTripsObject };
            } else {
                return { status: 404, message: "No Trips Found", data: allTripsObject };
            }
        } else {
            let singleTripObject = [];
            this[fileContent].trips.map(singleTrip => {
                
                if (!isNaN(tripId) && singleTrip.id === tripId && singleTrip.status === 'Active') {
                    singleTripObject.push(singleTrip);
                }else{
                    // bad request
                }
            });
            // console.log(singleTripObject);
            if (singleTripObject.length > 0) {
                return singleTripObject;
            } else {
                return singleTripObject;
            }
        }
    }
    getBookings(userId, tripId) {
        // console.log(tripId, userId);

        let singleTripObject = [];
        this[fileContent].trips.map(singleTrip => {

            if (singleTrip.id == tripId && singleTrip.status == 'Active') {
                singleTripObject.push(singleTrip);
            }
        });
        if (singleTripObject.length > 0) {
            // console.log(singleTrip);
            return singleTripObject;
        } else {
            return singleTripObject;
        }
    }

    // Create a booking
    BookTrip(user, tripId, seatNumber = "") {
        let bookings = this[fileContent].bookings
        let foundBookings = []
        bookings.map(singleBooking => {
            if (singleBooking.identification.trip_id == tripId && singleBooking.identification.user_id == user.id) {
                foundBookings.push(singleBooking);
            }
        });

        if (foundBookings.length > 0) {
            return { status: 409, message: "already exists" };
        } else {
            let data = this.getBookings(user.id, tripId)[0];
            let myTrip = {};
            myTrip.id = this[fileContent].bookings.length + 1
            myTrip.identification= {
                trip_id: tripId,
                user_id: user.id,
                created_on: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMinutes()}`,
                seat_number: seatNumber,
                status: "confirmed",
                status_updated_at: "0000-00-00 00-00-00",
                refundable: "no",
                random_refferance: this[Helper].randomString()
            };

            this[fileContent].bookings.push(myTrip);

            this[fs].writeFileSync(this[fileLocation], JSON.stringify(this[fileContent]), 'utf8', (error) => {
                if (!error) {
                    result = true;
                } else {
                    result = false;
                    console.log(error);
                    throw error;
                }
            });
            return { status: 201, message: "You booked a seat saccessfully", data:myTrip }
        }

    }

    // View a booking
    viewBooking(user, bookingId = 'all', is_admin = false) {
        console.log(user);
        
        let finalBookingResults = [];
        if (bookingId == 'all') {
            let allBookings = this[fileContent].bookings;
            allBookings.map(singleBooking => {
                // console.log(user.is_admin === 'false');
                if (user.is_admin === true) {
                    finalBookingResults.push(singleBooking);
                } else if (singleBooking.identification.user_id === user.id) {
                    finalBookingResults.push(singleBooking);
                }
            });

            if (finalBookingResults.length > 0) {
                return { status: 302, message: "success", data: finalBookingResults };
            } else {
                return { status: 404, message: "No Results", data: finalBookingResults };
            }
        } else {
            let singleBookingObject = [];
            this[fileContent].bookings.map(singleBooking => {

                if (singleBooking.id == bookingId && user.is_admin) {
                    singleBookingObject.push(singleBooking);
                } else if (singleBooking.id == bookingId && singleBooking.identification.user_id === user.id) {
                    singleBookingObject.push(singleBooking);
                }
            });
            if (singleBookingObject.length > 0) {
                return { status: 302, message: "success", data: singleBookingObject };

            } else {
                return { status: 404, message: "No Results", data: singleBookingObject };

            }
        }
    }

    deleteBooking(user, bookingId) {

        let bookings = this[fileContent].bookings;
        let response = {};
        this[fileContent].bookings.map(singleBooking => {

            if (singleBooking.id == bookingId && user.id == singleBooking.identification.user_id) {
                if (delete bookings[bookings.indexOf(singleBooking)]) {
                    this[fileContent].bookings.pop();
                    console.log(this[fileContent].bookings);
                    this[fs].writeFileSync(this[fileLocation], JSON.stringify(this[fileContent]), 'utf8', (error) => {
                        if (error) {
                            console.log(error);
                            throw error;
                        }
                    });
                    response = { status: 202, message: "Booking Deleted Successfully" };
                } else {
                    response = { status: 500, message: "Booking Could'n be deleted" };
                }
            } else {
                response = { status: 404, message: "You can't perform this action" };
            }

        });
        return response;
    }
    CancelTrip(user, bookingId) {

        let bookings = this[fileContent].bookings;
        let response = {};
        this[fileContent].bookings.map(singleBooking => {

            if (singleBooking.id == bookingId && user.id == singleBooking.identification.user_id) {
                if (delete bookings[bookings.indexOf(singleBooking)]) {
                    this[fileContent].bookings.pop();
                    console.log(this[fileContent].bookings);
                    this[fs].writeFileSync(this[fileLocation], JSON.stringify(this[fileContent]), 'utf8', (error) => {
                        if (error) {
                            console.log(error);
                            throw error;
                        }
                    });
                    response = { status: 202, message: "Booking Deleted Successfully" };
                } else {
                    response = { status: 500, message: "Booking Could'n be deleted" };
                }
            } else {
                console.log({ status: 404, message: "No Booking To Delete" });
                response = { status: 404, message: "Booking is not your to delete" };
            }

        });
        return response;
    }

    logout(userId) {
        this.userId = userId;
        this.userId = null;
        console.log(this.userId);
    }
}
module.exports = new WayFarer();