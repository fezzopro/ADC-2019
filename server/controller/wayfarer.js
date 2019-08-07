const ID = Symbol('userId');
const fileLocation = Symbol('fileLocation');
const fileContent = Symbol('fileContent');
const fs = Symbol('fs');
const path = Symbol('path');
const Helper = Symbol('Helper');
const bcrypt = Symbol('bcrypt');
class WayFarer {
    constructor(){
        this[fs] = require("fs");
        this[path] = require("path");
        this[fileLocation] = this[path].join(__dirname,"../models/data.json");
        this[Helper] = require("../helpers/helper");
        this[bcrypt] = require("bcrypt");
        this[ID] = null;
        this.tripID = null;
        this.bookingId = null;
        this[fileContent] = [];
        this[fs].readFile(this[fileLocation],(error, data_)=>{
            if (error) throw error;
            this[fileContent] = JSON.parse(data_)
        });
    }
    getDataContent(){
        return this[fileContent];
    }
    signin(username, password){
        let userData = {};
        
        this[fileContent].users.map((user)=>{
            if (user.username === username && this[bcrypt].compareSync(password,user.password)) {
                userData.status= "success"; 
                userData.data= user;
            }
        });
        
        return userData;
    }
    signup(data){
        let result = true;
        // Get All Available Users
        let allUsers = this[fileContent].users;
        // Change data id to be the next inline
        data.id = allUsers.length + 1;
        data.random_reference = this[Helper].randomString();
        // Push our signup object to the array
        this[fileContent].users.push(data);
        // Write to the file information abaout the user
        this[fs].writeFileSync(this[fileLocation],JSON.stringify(this[fileContent]),'utf8',(error)=>{
            if (error) {
                result = false;
                console.log(error);
                throw error;
            }
        });
        return result;
    }
    userExist(username){
        let results = false;
        this[fileContent].users.map(individualUser=>{
            if (individualUser.username === username) {
                results = true;
            }
        });
        return results;
    }
    tripExist(body){
        let results = false;
        this[fileContent].trips.map(individualtrip=>{
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
    createTrip(data){
        // Write on the file information about the trip
        let result = true;
        let allTrips = this[fileContent].trips;
        data.id = allTrips.length + 1;
        data.random_reference = this[Helper].randomString();
        this[fileContent].trips.push(data);
        this[fs].writeFileSync(this[fileLocation], JSON.stringify(this[fileContent]), 'utf8', (error)=>{
            if(!error){
                result = true;
            }else{
                result = false;
                console.log(error);
                throw error;                
            }
        });
        return result;
    }
    cancelTrip(userId = this.userId, tripId){
        // 
    }
    viewTrip(userId = this.userId, tripId = 'all'){
        if (tripId === 'all') {
            return {status:"Success",data:this[fileContent].trips};
        }else{
            let singleTripObject = [];
            this[fileContent].trips.map(singleTrip=>{
                if (singleTrip.id === tripId) {
                    singleTripObject.push( singleTrip);
                }
            });
            return {status:"Success", data:singleTripObject};
        }
    }
    // Create a booking
    BookTrip(userId = this.userId, params = []){}
    // View a booking
    viewBooking(userId = this.userId, bookingId = 'all'){
        if (bookingId === 'all') {
            let allBookings = this[fileContent].bookings;
            if(allBookings.length > 0){
                return {status:"success", data:allBookings};
            }else{
                return {status:"Empty Results", data:allBookings};
            }

        } else {
            let singleBookingObject = [];
            this[fileContent].bookings.map(singleBooking =>{
                if (singleBooking.id === bookingId) {
                    singleBookingObject.push(singleBooking);
                }
            });
            if (singleBookingObject.length >0 ) {
                return {status:"success", data:singleBookingObject};
                
            } else {
                return {status:"Empty Results", data:singleBookingObject};
                
            }
        }
    }
    deleteBooking(userId = this.userId, bookingId = 'all'){

    }
    logout(userId){
        this.userId = userId;
        this.userId = null;
        console.log(this.userId);
    }
}
module.exports = new WayFarer();