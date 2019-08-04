class WayFarer{
    constructor(){
        this.fs = require("fs");
        this.path = require("path");
        this.userId = null;
        this.tripID = null;
        this.bookingId = null;
        this. fileContent = [];
        this.fs.readFile(this.path.join(__dirname,"../models/data.json"),(error, data_)=>{
            if (error) throw error;
            this.fileContent = JSON.parse(data_)
            console.log('data loaded');
        });
    }
    getDataContent(){
        return this.fileContent;
    }
    signin(username, password){
        if (username === 'fezzopro@gmail.com' && password === 'password') {
            return true;
        }else{
            return false;
        }
    }
    signup(data){

        // Get All Available Users
        let allUsers = this.fileContent.users;
        // Change data id to be the next inline
        data.id = allUsers.length + 1;
        console.log(data);
        // Push our signup object to the array
        this.fileContent.users.push(data);
        // Write to the file information abaout the user
        this.fs.writeFile(this.path.join(__dirname,"../models/data.json"),JSON.stringify(this.fileContent),'utf8',(error)=>{
            if (error) {
                return error;
            }else {
                return JSON.stringify(data);
            }
        });
    }
    createTrip(params = []){
        // Write on the file information about the trip
    }
    cancelTrip(userId = this.userId, tripId){
        // 
    }
    viewTrip(userId = this.userId, tripId = 'all'){
        if (tripId === 'all') {
            return this.fileContent.trips;
        }else{
            let singleTripObject = [];
            this.fileContent.trips.map(singleTrip=>{
                if (singleTrip.id === tripId) {
                    singleTripObject = singleTrip;
                }
            });
            return singleTripObject;
        }
    }
    // Create a booking
    BookTrip(userId = this.userId, params = []){}
    // View a booking
    viewBooking(userId = this.userId, bookingId = 'all'){
        if (bookingId === 'all') {
            return this.fileContent.bookings;
        } else {
            console.log(bookingId);
            let singleBookingObject = [];
            this.fileContent.bookings.map(singleBooking =>{
                if (singleBooking.id === bookingId) {
                    singleBookingObject = singleBooking;
                    console.log(singleBookingObject);
                    
                }
            });
            return singleBookingObject;
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