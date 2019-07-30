const app = require("../server/app");

describe("Addition Function", ()=>{
    it("Addint two numbers A and B to be Z", ()=>{
        expect(app.add(5,10)).toEqual(15);
    });
    describe("Functions Related To User Authentication",()=>{
        let username = 'fezzopro@gmail.com';
        let password = 'password';
        it("Check Sign-in information", ()=>{
            expect(app.signin(username,password)).toBe(true);
        });

        it("Check Sign-up information", ()=>{
            expect(app.signup(firstname,lastname,email,dob,username,password)).toBe(true);
        });

        it("Check Logout function", (userId=10)=>{
            expect(app.logout(userId)).toBe(true);
        });
    });

    describe("Functions Related To Trips",()=>{

        it("Check create Trip function", ()=>{
            expect(app.createTrip(tripname, departuretime,origin,destination,numb_of_seats,bus_plate)).toBe(true);
        });

        it("Check cancel Trip function", ()=>{
            expect(app.cancelTrip(userId, tripId)).toBe(true);
        });

        it("Check view Trips function", ()=>{
            expect(app.viewTrip(userId, tripId)).toBe(true);
        });
    })

    describe("Functions Related To Bookings",()=>{

        it("Check book Trips function", ()=>{
            expect(app.BookTrip(userId, tripId)).toBe(true);
        });
    
        it("Check view booking function", ()=>{
            expect(app.viewBooking(userId, bookingId)).toBe(true);
        });
    
        it("Check delete booking function", ()=>{
            expect(app.deleteBooking(userId, bookingId)).toBe(true);
        });
    });

});