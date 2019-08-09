const Coveralls = require ('coveralls');
Coveralls.wear;
// Coveralls.wear!;
const request = require("request");
// const app = require("../server/controller/wayfarer");
const routes = require("../server");
const baseUrl = process.env.BASE_URL || "http://localhost:8000/";


describe("SERVER", () => {
    let server;
    beforeAll(() => {
        console.log(process.env.JWT_KEY)
        server = require("../server")
    });
    afterAll(() => {
        server.close();
    });
});

// Testing Authentication API endpoints Signin Endpoint

describe('POST /auth/signup', () => {

});
// Testing Authentication API endpoints Signin Endpoint
describe("Check the authantication  API/V1/auth/sigin", () => {
    it("check the username", (done) => {
        let dummyData = {
            "username": "123556462575861@gmail.com",
            "password": "123"
        };
        request({
            url: baseUrl + 'API/V1/auth/signin',
            method: 'POST',
            headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify(dummyData)
        },
            (error, response, body) => {
                console.log(process.env.JWT_KEY);
                
                console.log(body);
                // expect(JSON.parse(body).status).toBe(401);
            });

        done();
    });
});

// Testing Trips API Endpoints

describe("Testing API/V1/trips", () => {
    let dammyData = {}
    it("Check The unauthorized creation of trips", (done) => {
        // request.head()
        request.post({ url: baseUrl + 'API/V1/trips/' }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(401);
            done();
        });
    });
    it("Check The authorized creation of trips", (done) => {
        // request.head()
        request.post({ url: baseUrl + 'API/V1/trips/' }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(401);
            done();
        });
    });
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
    it("Check to View A particular Trip", (done) => {
        let tripId = 'kfjf kfj';
        request.get(`${baseUrl}API/V1/trips/${tripId}`, (error, response, body) => {
            if (isNaN(tripId)) {
                expect(JSON.parse(body).status).toBe(400);
            } else {
                if (JSON.parse(body).hasOwnProperty("status") && JSON.parse(body).data.length > 0) {
                    expect(JSON.parse(body).status).toBe(302);
                } else {
                    expect(JSON.parse(body).status).toBe(404);
                }
            }
            done();
        });
    });
});

// Testing Bookings API Endpoints

describe("Testing Booking API End Point with Authentication /API/V1/bookings", () => {
    let rightUser = {
        "username": "123556462575861@gmail.com",
        "password": "123"
    };
    let wrongUser = {
        "username": "3556462575861@gmail.com",
        "password": "123"
    };


    it("Trying to book a seat with Authentication", (done) => {
        done()
    });
    it("Trying to View All the bookings with Authentication", (done) => {
        done()
    });
    it("Trying to View a specific booking with Authentication", (done) => {
        done()
    });
    it("Trying to Delete a specific booking with Authentication", (done) => {
        done()
    });
});

describe("Running the tests for the API that Require authantacation before", () => {
    // Book a seat without authentication
    it("Trying to book a seat without Authentication POST /API/V1/bookings", (done) => {
        let dummyData = { "trip_id": 11 };
        let faketoken = "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lcyI6IkdpbGRhcyBNYXJrIiwiaXNfYWRtaW4iOmZhbHNlLCJpZCI6MTIsImlhdCI6MTU2NTMxMjYwMSwiZXhwIjoxNTY1MzE2MjAxfQ.TfdxP2ca_tDk12A6-NHUEtR9rcoC1IVR7MnFEfzgEf4";
        request({
            url: baseUrl + 'API/V1/bookings',
            method: 'POST',
            headers: {
                'content-type': 'Application/json',
                'Authorization': faketoken
            },
            body: JSON.stringify(dummyData)
        }, (error, response, body) => {
            console.log(body);
            expect(JSON.parse(body).status).toBe(401);

        });
        done()
    });
    it("Trying to View All the bookings without Authentication", (done) => {
        done()
    });
    it("Trying to View a specific booking without Authentication", (done) => {
        done()
    });
    it("Trying to Delete a specific booking without Authentication", (done) => {
        done()
    });
});
