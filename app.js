class WayFarer{
    constructor(){
    }
    add(a, b){
        return a+b;
    }
    signin(username, password){}
    signup(params = []){}
    createTrip(params = []){}
    cancelTrip(userId = this.userId, tripId){}
    viewTrip(userId = this.userId, tripId=all){}
    BookTrip(userId = this.userId, params = []){}
    viewBooking(bookingId = all){}
    deleteBooking(userId = this.userId, bookingId){}
}
module.exports = new WayFarer();