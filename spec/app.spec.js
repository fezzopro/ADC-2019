const request = require("request");
const wayfarer = require("../server/controller/wayfarer");
const routes = require("../server");
const bodies = require("../server/helpers/requestBodies");
const generateToken = require("../server/helpers/generateToken");
const bookingsController = require("../server/controller/bookings");
const tripsController = require("../server/controller/trips");
const uersController = require("../server/controller/user");
const helpers = require("../server/helpers/helper");
const baseUrl = process.env.BASE_URL || "http://localhost:8000/";
process.env.JWT_KEY = "#y*7Gw2k4My&hFH";

let faketoken = "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lcyI6IkdpbGRhcyBNYXJrIiwiaXNfYWRtaW4iOmZhbHNlLCJpZCI6MTIsImlhdCI6MTU2NTMxMjYwMSwiZXhwIjoxNTY1MzE2MjAxfQ.TfdxP2ca_tDk12A6-NHUEtR9rcoC1IVR7MnFEfzgEf4";
let realtoken;


describe("SERVER", () => {
    let server;
    beforeAll(() => {
        server = require("../server")
    });
    afterAll(() => {
        server.close();
    });
});

// Testing Authentication API endpoints Signin Endpoint

describe('POST API/V1/auth/signup', () => {
    it("Testing the signUp API Endpoint with new account", done => {
        let username = helpers.randomString();
        let dummyData = {
            "first_name": "Gildas",
            "last_name": `${username}`,
            "username": `${username}@gmail.com`,
            "password": "123",
            "is_admin": true,
            "status": "active"
        };

        request({
            url: baseUrl + 'API/V1/auth/signup',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            
                expect(JSON.parse(body).status).toBe(201);

        });
        done();
    });

    it("Testing the signUp API Endpoint with existing account", done => {

        let dummyData = {
            "first_name": "Gildas",
            "last_name": "",
            "username": "125258585kjh@gmail.com",
            "password": "123",
            "is_admin": true,
            "status": "active"
        };

        request({
            url: baseUrl + 'API/V1/auth/signup',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            if (JSON.parse(body).message === "Your Account has been Created successfully") {
                expect(JSON.parse(body).status).toBe(201);

            } else if (JSON.parse(body).message === "User Already Exists") {

                expect(JSON.parse(body).status).toBe(409);
            } else if (JSON.parse(body).data === "Incorrest Inputs")
                expect(JSON.parse(body).status).toBe(401);

        });
        done();
    });

    it("Testing the signUp API Endpoint with empty lastname", done => {
        let dummyData = {
            "first_name": "Gildas",
            "last_name": "",
            "username": "125258585kjh@gmail.com",
            "password": "123",
            "is_admin": true,
            "status": "active"
        };

        request({
            url: baseUrl + 'API/V1/auth/signup',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
                expect(JSON.parse(body).status).toBe(401);

        });
        done();
    });


    it("Testing the signUp API Endpoint with empty lastname", done => {
        let dummyData = {
            "first_name": "Gildas",
            "last_name": "Mark",
            "username": "125258585kjh@gmail.com",
            "password": "123",
            "is_admin": true,
            "status": "active"
        };

        request({
            url: baseUrl + 'API/V1/auth/signup',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {

                expect(JSON.parse(body).status).toBe(409);

        });
        done();
    });



});
// Testing Authentication API endpoints Signin Endpoint
describe("Check the authantication  API/V1/auth/sigin", () => {
    it("check the signin response status with the correct creadentials", (done) => {
        let dummyData = {
            "username": "1235564756@gmail.com",
            "password": "123"
        };
        request({
            url: baseUrl + 'API/V1/auth/signin',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        },
            (error, response, body) => {
                realtoken = `Bearer ${JSON.parse(body).token}`;
                expect(JSON.parse(body).status).toBe(200);
            });
        done();
    });

    it("check the signin response status with incorrect Credentials", (done) => {
        let dummyData = {
            "username": "123556462575861@gmail.com",
            "password": "123d"
        };
        request({
            url: baseUrl + 'API/V1/auth/signin',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        },
            (error, response, body) => {
                expect(JSON.parse(body).status).toBe(401);
            });

        done();
    });

    it("check the signin response status with empty username", (done) => {
        let dummyData = {
            "username": "",
            "password": "123"
        };
        request({
            url: baseUrl + 'API/V1/auth/signin',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        },
            (error, response, body) => {
                expect(JSON.parse(body).status).toBe(200);
                expect(JSON.parse(body).message === "Fill All The Fields");
            });

        done();
    });

    it("check the signin response status When a user account is not active", (done) => {
        let dummyData = {
            "username": "125258585kjh@gmail.com",
            "password": "123"
        };
        request({
            url: baseUrl + 'API/V1/auth/signin',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        },
            (error, response, body) => {

                expect(JSON.parse(body).status).toBe(401);
            });

        done();
    });
});

// Testing Trips API Endpoints

describe("Testing API/V1/trips", () => {

    it("Check The authorized creation of trips", done => {
        let dummyData = {
            "seats_capacity": "30",
            "bus_license_number": "RAC102G",
            "origin": "rubavu",
            "destination": "Musanze",
            "trip_date": "2019-07-21",
            "fare": "2500.25",
            "status": "Active"
        };
        request({
            uri: `${baseUrl}API/V1/trips/`,
            method: 'POST',
            headers: {
                'Content-Type': 'Aplication/json',
                'Authorization': realtoken
            },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            // console.log(body);
            // console.log(realtoken)
            expect(JSON.parse(body).status).toBe(401);
        })
        done();
    });

    it("Check The unauthorized creation of trips", done => {
        let dummyData = {
            "seats_capacity": "30",
            "bus_license_number": "RAC102G",
            "origin": "rubavu",
            "destination": "Musanze",
            "trip_date": "2019-07-21",
            "fare": "2500.25",
            "status": "Active"
        };
        request({
            uri: `${baseUrl}API/V1/trips`,
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(401);

        });
        done();
    })

    it("Check View all trips", (done) => {

        request.get({ url: `${baseUrl}API/V1/trips/` }, (error, response, body) => {

            if (JSON.parse(body).data.length > 0) {
                expect(JSON.parse(body).status).toBe(302);
            } else {
                expect(JSON.parse(body).status).toBe(404);
            }
            done();
        });
    });
    it("Check to View A particular Trip with incorrect trip id", (done) => {
        let tripId = 'kfjfkfj';
        request.get(`${baseUrl}API/V1/trips/${tripId.trim()}`, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(400);
        });
        done();
    });

    it("Check to View A particular Trip with correct trip id", (done) => {
        let tripId = '2';
        request.get(`${baseUrl}API/V1/trips/${tripId}`, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(302);

        });
        done();
    });

    it("Check to View A particular Trip with non-existing trip id", (done) => {
        let tripId = '200';
        request.get(`${baseUrl}API/V1/trips/${tripId}`, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(404);

        });
        done();
    });
});

// Testing Bookings API Endpoints

describe("Testing Booking API End Point without Authentication /API/V1/bookings", () => {

    it("Trying to book a seat without Authentication", (done) => {
        let dummyData = {
            "trip_id": 11
        };
        request({
            uri:`${baseUrl}API/V1/bookings`,
            method: 'POST',
            headers:{
                'Content-Type':'Application/json',
            },
            body:JSON.stringify(dummyData)
        },(error,response,body)=>{
            expect(JSON.parse(body).status).toBe(401);
        });
        done()
    });
    it("Trying to View All the bookings without Authentication", (done) => {
        request.get(`${baseUrl}API/V1/bookings`,(error,response,body)=>{
            expect(JSON.parse(body).status).toBe(401);
        })
        done()
    });
    it("Trying to View a specific booking without Authentication", (done) => {
        request.get(`${baseUrl}API/V1/bookings/${1}`,(error,response,body)=>{
            expect(JSON.parse(body).status).toBe(401);
        })
        done()
    });
    it("Trying to Delete a specific booking without Authentication", (done) => {
        request.delete(`${baseUrl}API/V1/bookings/${1}`,(error,response,body)=>{
            expect(JSON.parse(body).status).toBe(401);
        })
        done()
    });
});

describe("Running the tests for the API that Require authantacation before", () => {
    // Book a seat without authentication
    it("Trying to book a seat with Authentication with an existing book trip POST /API/V1/bookings", (done) => {
        let dummyData = { "trip_id": 110 };
        request({
            url: baseUrl + 'API/V1/bookings',
            method: 'POST',
            headers: {
                'content-type': 'Application/json',
                'Authorization': realtoken
            },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(409);

        });
        done()
    });
    it("Trying to book a seat with Authentication and a new trip_id POST /API/V1/bookings", (done) => {
        let dummyData = { "trip_id": 110 };
        request({
            url: baseUrl + 'API/V1/bookings',
            method: 'POST',
            headers: {
                'content-type': 'Application/json',
                'Authorization': realtoken
            },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(201);

        });
        done()
    });
    it("Trying to view all bookings with Authentication POST /API/V1/bookings", (done) => {
        let dummyData = { "trip_id": 110 };
        request({
            url: baseUrl + 'API/V1/bookings',
            method: 'GET',
            headers: {
                'content-type': 'Application/json',
                'Authorization': realtoken
            }
        }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(302);

        });
        done()
    });
    it("Trying to view all bookings with Authentication POST /API/V1/bookings", (done) => {
        let dummyData = { "trip_id": 110 };
        request({
            url: baseUrl + 'API/V1/bookings/'+110,
            method: 'GET',
            headers: {
                'content-type': 'Application/json',
                'Authorization': realtoken
            }
        }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(302);

        });
        done()
    });
    it("Trying to delete a booking a seat with Authentication and a new trip_id POST /API/V1/bookings", (done) => {
        let dummyData = { "trip_id": 110 };
        request({
            url: baseUrl + 'API/V1/bookings',
            method: 'DELETE',
            headers: {
                'content-type': 'Application/json',
                'Authorization': realtoken
            },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            console.log(body)
            expect(JSON.parse(body).status).toBe(200);

        });
        done()
    });

});
