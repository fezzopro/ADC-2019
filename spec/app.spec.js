const request = require("request");
const app = require("../server/controller/wayfarer");
const routes = require("../server");
const baseUrl = process.env.BASE_URL || "http://localhost:8000/";

describe("SERVER", () => {
    let server;
    beforeAll(() => {
        server = require("../server")
    });
    afterAll(() => {
        server.close();
    });
});
describe("Check the authantication  API/V1/auth/signup", () => {
    it("check the username", (done) => {
        let reqData = {
            "username": "fezzopro@gmail.com",
            "password": "123"
        };
        request.get({ url: baseUrl + 'API/V1/auth/signin' }, (error, response, body) => {
            // return body;
            // expect(JSON.parse(body).status).toBe(401);
            console.log(body);
            done();
        });

    });
});
describe("Testing API/V1/trips", () => {
    it("Check The unauthorized creation of trips", (done) => {
        request.post({ url: baseUrl + 'API/V1/trips' }, (error, response, body) => {
            console.log(body);
            done();

        });
    });
    it("check the username", (done) => {
        request.get({ url: baseUrl + 'API/V1/trips/' }, (error, response, body) => {
            expect(JSON.parse(body).status).toBe(401);
            console.log(body);
            done();
        });
    });
});
// describe("Addition Function", () => {

//     describe("Functions Related To User Authentication", () => {
//         let username = 'fezzopro@gmail.com';
//         let password = 'password';
//         it("Check Sign-in information", () => {
//             expect(app.signin(username, password)).toBe(true);
//         });
//         it("Check Sign-in information", () => {
//             expect(password.length > 3).toBe(true);
//         });

//         it("Check Sign-up information", () => {
//             expect(app.signup(firstname, lastname, email, dob, username, password)).toBe(true);
//         });

//         it("Check Logout function", (userId = 10) => {
//             expect(app.logout(userId)).toBe(true);
//         });
//     });

//     describe("Functions Related To Trips", () => {

//         it("Check create Trip function", () => {
//             expect(app.createTrip(tripname, departuretime, origin, destination, numb_of_seats, bus_plate)).toBe(true);
//         });

//         it("Check cancel Trip function", () => {
//             expect(app.cancelTrip(userId, tripId)).toBe(true);
//         });

//         it("Check view Trips function", () => {
//             expect(app.viewTrip(userId, tripId)).toBe(true);
//         });
//     })

//     describe("Functions Related To Bookings", () => {

//         it("Check book Trips function", () => {
//             expect(app.BookTrip(userId, tripId)).toBe(true);
//         });

//         it("Check view booking function", () => {
//             expect(app.viewBooking(userId, bookingId)).toBe(true);
//         });

//         it("Check delete booking function", () => {
//             expect(app.deleteBooking(userId, bookingId)).toBe(true);
//         });
//     });

// });